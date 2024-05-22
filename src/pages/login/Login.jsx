import React, {useEffect, useState} from 'react';
import styles from './login.module.css'
import getImage from '../../utils/getImage'
import Input from "../../components/input/Input";
import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from "react-redux";
import {authUser} from "../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput"
import {getAdminAuth, putUsersIcon} from "../../API/getUsers";
import AuthService from "../../utils/authService";

function Login() {
    const [correctInput, setCorrectInput] = useState(false)
    const [validButtonLogin, setValidButtonLogin] = useState(false)
    const email = useInput("")
    const password = useInput("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Деактивация кнопки "Далее" если одно из полей ввода пустое
    useEffect(() => {
        if((email.value && password.value) !== "") {
            setValidButtonLogin(false)
        } else {
            setValidButtonLogin(true)
        }
    }, [email.value, password.value]);

    const setLoginInfo = (info) => {
        dispatch(authUser(info))
        navigate("/")
    }

    // Вход через гугл аккаунт
    const googleLogin = useGoogleLogin ( {
        onSuccess: async (tokenResponse) => {
            const user = await AuthService.userLogin(tokenResponse)
            if (user) {
                setLoginInfo(user.user)
                await putUsersIcon(user.user.id, user.user.picture)
            }
        },
        onError: (errorResponse) => console.log(errorResponse)
    });

    const adminLogin = async () => {
        const loginInfo = await getAdminAuth(email.value, password.value)
        if (loginInfo.accessToken) {
            localStorage.setItem('token', loginInfo.accessToken)
            setLoginInfo(loginInfo.user)
        } else {
            setCorrectInput(true)
        }
    }

    return (
        <div className={styles.backgroundWrapper}>

            <img
                className={`${styles.backgroundCircle} ${styles.circleTop}`}
                src={getImage("circleTop")} alt="#"
            />

            <img
                className={`${styles.backgroundCircle}
                 ${styles.circleBot}`}
                src={getImage("circleBot")}
                alt="#"
            />

            <div className={styles.loginArrayWrapper}>

                <div>
                    <img
                        className={styles.logo}
                        src={getImage("logo")}
                        alt="#"
                    />
                </div>

                <Input
                    label="Введите Почту"
                    value={email.value}
                    onChange={email.onChange}
                    incorrect={correctInput}
                    setIncorrect={setCorrectInput}
                />

                <Input
                    label="Введите Пароль"
                    value={password.value}
                    onChange={password.onChange}
                    incorrect={correctInput}
                    setIncorrect={setCorrectInput}
                    type='password'
                />

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.loginButton}
                        onClick={() => adminLogin()}
                        disabled={validButtonLogin}
                    >
                        далее
                    </button>

                    <button
                        className={styles.googleButton}
                        onClick={() => googleLogin()}
                    >
                        войти через Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;