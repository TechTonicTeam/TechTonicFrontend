import React, {useState} from 'react';
import getImage from "../../utils/getImage";
import styles from './Header.module.css'
import Burger from "../burger/Burger";
import {useNavigate} from "react-router-dom";
import ModalToSendMessage from '../modalToSendMessage/ModalToSendMessage'

const Header = () => {
    const navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(false)
    const [modalToSendMessageIsActive, setModalToSendMessageIsActive] = useState(false)
    const openMenu = () => {
        setMenuActive(true)
    }
    const toggleModalToSendMessage = () => {
        setModalToSendMessageIsActive(!modalToSendMessageIsActive)
        setMenuActive(false)
    }

    return (
        <div>
            {modalToSendMessageIsActive && <ModalToSendMessage modalActive={modalToSendMessageIsActive}handleClose={toggleModalToSendMessage}/>}
            <div className={styles.wrapper}>
                <img
                    className={styles.logo}
                    src={getImage("logo")}
                    alt="#"
                    onClick={() => navigate("/")}
                />
                <div
                    className={styles.burgerButton}
                    onClick={openMenu}
                >
                    <span></span>
                </div>
            </div>
            <Burger active={menuActive} setActive={setMenuActive} handleClose={toggleModalToSendMessage}/>
        </div>
    );
};

export default Header;