import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import Layout from "./Layout";
import { createMemoryRouter, RouterProvider, useOutletContext } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => vi.resetAllMocks());

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

let addQty = 0;
let changeQty = 0;
function ProductListingChild() {
    const context = useOutletContext();
    return (
        <>
            <div data-testid="add-to-cart">
                {context.products.map(prods => <button onClick={() => context.addToCart(prods.id, addQty)}>{prods.title}</button>)}
            </div>
            <div data-testid="change-cart">
                {context.products.map(prods => <button onClick={() => context.changeCart(prods.id, changeQty)}>{prods.title}</button>)}
            </div>
            <pre data-testid="cart-object">
                {JSON.stringify(context.cart)}
            </pre >
        </>

    )
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


describe("Handles Cart data", () => {

    const childComponent = <ProductListingChild />;

    it("Child can access cart", async () => {
        window.fetch = vi.fn().mockResolvedValueOnce(
            {
                ok: true,
                json: () => Promise.resolve(product)
            }
        );

        renderRoute(childComponent);

        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));
        
        const buttonContainer = within(screen.getByTestId("add-to-cart"));
        expect(buttonContainer.getByText(/foo/i)).toBeInTheDocument();

        const cart = JSON.parse((screen.getByTestId("cart-object")).textContent);
        expect(cart.cartItems).toBeDefined();
    });

    it("Child can change cart using function passed down", async () => {
        window.fetch = vi.fn().mockResolvedValueOnce(
            {
                ok: true,
                json: () => Promise.resolve(product)
            }
        );

        const user = userEvent.setup();
        renderRoute(childComponent);

        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));
        const cartElement = screen.getByTestId("cart-object");
        let cart = JSON.parse(cartElement.textContent);
        expect(cart.cartItems.length).toBe(0);

        const addBtnCtn = within(screen.getByTestId("add-to-cart"));
        const changeBtnCtn = within(screen.getByTestId("change-cart"));

        addQty = 5;
        await user.click(addBtnCtn.getByText(/foo/i));

        cart = JSON.parse(cartElement.textContent);
        
        expect(cart.cartItems.length).toBe(1);
        expect(cart.cartItems[0].title).toBe("foo");
        expect(cart.cartCount).toBe(5);

        changeQty = 0;

        await user.click(changeBtnCtn.getByText(/foo/i));

        cart = JSON.parse(cartElement.textContent);
        expect(cart.cartItems.length).toBe(0);
        expect(cart.cartCount).toBe(0);

    });

    it("Child can cause header icon to change", async () => {
        window.fetch = vi.fn().mockResolvedValueOnce(
            {
                ok: true,
                json: () => Promise.resolve(product)
            }
        );

        const user = userEvent.setup();
        renderRoute(childComponent);

        await waitForElementToBeRemoved(() => screen.getByText(/Now Loading/i));

        const cartIconCount = screen.getByTestId("cart-icon-count");
        expect(cartIconCount.textContent).toBe("0");
   

        const addBtnCtn = within(screen.getByTestId("add-to-cart"));
        const changeBtnCtn = within(screen.getByTestId("change-cart"));

        addQty = 5;
        await user.click(addBtnCtn.getByText(/foo/i));

        expect(cartIconCount.textContent).toBe("5");

        changeQty = 0;

        await user.click(changeBtnCtn.getByText(/foo/i));
        expect(cartIconCount.textContent).toBe("0");

        addQty = 3;
        await user.click(addBtnCtn.getByText(/bar/i));

        changeQty = 1;

        await user.click(changeBtnCtn.getByText(/bar/i));

        addQty = 5;
        await user.click(addBtnCtn.getByText(/baz/i));

        expect(cartIconCount.textContent).toBe("6");

    });
});