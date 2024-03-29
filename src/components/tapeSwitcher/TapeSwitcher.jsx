import React, {useEffect} from 'react';
import styles from './TapeSwitcher.module.css'
import {useDispatch, useSelector} from "react-redux";
import {changeSwitcher} from "../../store/slices/switchTape";

const TapeSwitcher = () => {
    const switchState = useSelector(state => state.switchTape.switch)
    const dispatch = useDispatch()

    useEffect(() => {
        const switchItem = JSON.parse(localStorage.getItem("switcher"))
        if (switchItem) dispatch(changeSwitcher({switch: switchItem}))
    }, [dispatch]);

    const switcher = (sw) => {
        localStorage.setItem("switcher", sw)
        dispatch(changeSwitcher({switch: sw}))
    }

    return (
        <div className={styles.wrapper}>
            <div className={switchState ? styles.colorSwitch + " " + styles.colorSwitchRight : styles.colorSwitch}>
            </div>

            <div
                className={styles.switchButton}
                onClick={() => switcher(false)}
            >
                <span>Лента предложений</span>
            </div>

            <div
                className={styles.switchButtonRight}
                onClick={() => switcher(true)}
            >
                <span>Лента голосований</span>
            </div>
        </div>
    );
};

export default TapeSwitcher;