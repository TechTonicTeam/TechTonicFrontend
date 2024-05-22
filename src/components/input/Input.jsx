import React from 'react';
import styles from './Input.module.css'

const Input = ({label, value, onChange, incorrect, setIncorrect, type}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>
            <input
                onFocus={() => setIncorrect(false)}
                className={styles.input}
                value={value}
                onChange={onChange}
                style={incorrect ? {border: "1px solid red"} : {border: "0 solid red"}}
                type={type ? type : 'text'}
            />
        </div>
    );
};

export default Input;