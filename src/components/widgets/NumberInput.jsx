import styles from "./NumberInput.module.css";

function NumberInput({number, setNumber}) {

    return (
        <div className={styles.numberInput}>
            <button onClick={() => setNumber(prev => prev - 1)}>-</button>
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
            <button onClick={() => setNumber(prev => prev + 1)}>+</button>
        </div>
    )
}

export default NumberInput;