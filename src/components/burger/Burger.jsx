import React from 'react';
import styles from './Burger.module.css'
import getImage from "../../utils/getImage";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/slices/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {changeSwitcher} from "../../store/slices/switchTape";
import {logoutUser} from "../../API/getUsers";


const Burger = ({active, setActive, handleClose}) => {
    const user = useSelector(state => state.authLevel)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const closeBurger = () => {
        setActive(false)
    }

    const exitProfile = async () => {
        await logoutUser(user.email)
        localStorage.removeItem('token')
        dispatch(logout())
    }

    const switchTape = (change) => {
        if (!(location.pathname === "/")) navigate("/")
        dispatch(changeSwitcher({switch: change}))
        localStorage.setItem("switcher", change)
    }

    return (
            <div className={styles.wrapper + " " + (active ? styles.burgerActive : styles.burgerDisabled)}>
                <div
                    className={styles.burgerExit}
                    onClick={closeBurger}
                >
                </div>

                <div className={styles.burgerUpperWrapper}>
                    <img
                        className={styles.burgerUserImg}
                         src={user.picture}
                         alt=""
                    />
                    <div className={styles.userInfoWrapper}>
                        <p className={styles.burgerUsername}>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>

                <ul className={styles.burgerNavbar}>
                    <li onClick={() => switchTape(false)}>
                        <img
                            src={getImage("human")}
                            alt=""
                        />
                        <span>Лента предложений</span>
                    </li>
                    <li onClick={() => switchTape(true)}>
                        <img
                            src={getImage("voting")}
                            alt=""
                        />
                        <span>Лента голосований</span>
                    </li>
                    <li>
                        <img
                            src={getImage("report")}
                            alt=""
                        />
                        <span onClick={handleClose}>Связь с руководством</span>
                    </li>
                </ul>

                <div className={styles.burgerBottomWrapper}>
                    <img
                        src={getImage("exit")}
                        alt=""
                    />
                    <button onClick={exitProfile}>Выход</button>
                </div>

                <img
                    className={styles.burgerStyle}
                    src={getImage("burgerStyle")}
                    alt=""
                />
            </div>
    );
};

export default Burger;