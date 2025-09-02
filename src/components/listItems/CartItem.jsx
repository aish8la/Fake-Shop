import { useState } from "react"

function CartItem({item}) {
    const [quantity, setQuantity] = useState(item.qty);

    return (
        <div>
            <img src={item.image}/>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
        </div>
    )
}

export default CartItem;