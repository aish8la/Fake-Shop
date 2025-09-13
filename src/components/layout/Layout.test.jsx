import { describe, it, expect, vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Layout from "./Layout";
import { createMemoryRouter, RouterProvider, useOutletContext } from "react-router-dom";



function renderRoute(mockOutletChild) {
    const routes = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: mockOutletChild,
                },
            ]
        }
    ]

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

}

function ChildStringedData() {
    const context = useOutletContext();
    return <pre data-testid="context" >{JSON.stringify(context)}</pre>
}

const product = [
  {
    "id": 1,
    "title": "foo",
    "price": 19.99,
  },
  {
    "id": 2,
    "title": "bar",
    "price": 29.5,
  },
  {
    "id": 3,
    "title": "baz",
    "price": 12.0,
  }
]

describe("Layout component data fetching", () => {

    const childComponent = <ChildStringedData />;

    it("Fetch and pass product data to outlet context", async () => {
        
        window.fetch = vi.fn().mockResolvedValueOnce(
            {
                ok: true,
                json: () => Promise.resolve(product)
            }
        );

        renderRoute(childComponent);

        expect(screen.getByText(/Now Loading/i));
        
        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));

        const context = JSON.parse((screen.getByTestId("context")).textContent);

        expect(context.products.length).toBe(3);
        expect(context.products[0].title).toEqual("foo");
    });

    it("Show Error Page when server error", async () => {
        window.fetch = vi.fn().mockResolvedValueOnce(
            {
                ok: false,
                status: 500,
                json: () => Promise.resolve({message: "Server exploded"}),
            }
        );

        renderRoute(childComponent);

        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));
        expect(screen.getByText(/Oops/i)).toBeInTheDocument();
        expect(screen.getByText(/500/i)).toBeInTheDocument();
    });

    it("Show Error Page when fetch fails", async () => {
        window.fetch = vi.fn().mockRejectedValueOnce(new Error("Fetch failed"));

        renderRoute(childComponent);

        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));
        expect(screen.getByText(/Oops/i)).toBeInTheDocument();
        expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument();
    });
});