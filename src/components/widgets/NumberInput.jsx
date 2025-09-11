import styles from "./NumberInput.module.css";

function NumberInput({number, setNumber}) {

    function changeNumber(modifier = 1, newNumber = null) {
        setNumber(prev => {
            if(newNumber) {
                newNumber = parseInt(newNumber);
            } else {
                newNumber = parseInt(prev) + modifier;
            }
            return parseInt(newNumber > 99 || newNumber < 1 ? 1 : newNumber);
        });
    }

    return (
        <div className={styles.numberInput}>
            <button onClick={() => changeNumber(-1)}>-</button>
            <input type="number" value={number} onChange={(e) => changeNumber(0, e.target.value)} max="1" min="99"/>
            <button onClick={() => changeNumber(1)}>+</button>
        </div>
    )
}

export default NumberInput;