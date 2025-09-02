import { useOutletContext } from "react-router-dom";

function CartItem({item}) {
    const {changeCart} = useOutletContext();

    return (
        <div>
            <img src={item.image}/>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <input type="number" value={item.qty} onChange={(e) => changeCart(item.id, parseInt(e.target.value))}></input>
        </div>
    )
}

export default CartItem;