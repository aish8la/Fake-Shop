import styles from "./NumberInput.module.css";

function NumberInput({number, setNumber}) {

    function changeNumber(newNumber) {
        if(newNumber === "") return
        newNumber = parseInt(newNumber)
        if(newNumber > 99 || newNumber < 1) return
        setNumber(newNumber);
    }

    return (
        <div className={styles.numberInput}>
            <button onClick={() => changeNumber(number - 1)}>-</button>
            <input type="number" value={number} onChange={(e) => changeNumber(e.target.value)} max="1" min="99"/>
            <button onClick={() => changeNumber(number + 1)}>+</button>
        </div>
    )
}

export default NumberInput;