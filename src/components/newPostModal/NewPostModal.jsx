import React, {useEffect, useState} from 'react';
import styles from './NewPostModal.module.css'
import useInput from "../../hooks/useInput";
import {useSelector} from "react-redux";
import {createPost} from "../../API/getPosts";
import getImage from "../../utils/getImage";
const NewPostModal = ({activeModal, setActiveModal, setPost}) => {
    const themePost = useInput("")
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const user = useSelector(state => state.authLevel)
    const date = new Date()
    useEffect(() => {
        activeModal
            ?
            document.body.style.overflow = "hidden"
            :
            document.body.style.overflow = "unset"
    }, [activeModal]);

    const setImageInput = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', themePost.value)
        formData.append('timestamp', date.toLocaleString('en-US', {timeZone: 'Europe/Moscow'}))
        formData.append('user_id', user.id)
        const newPost = await createPost(formData)
        setPost(prev => [newPost.data, ...prev])
        setActiveModal(false)
    }

    return (
        <div className={activeModal ? styles.modalWrapper : styles.modalWrapperNone}>
            <div className={styles.modalHeader}>
                <p>Новая публикация</p>
                <img alt='' src={getImage('cross')} onClick={() => setActiveModal(false)}/>
            </div>
            <form className={styles.modalInner}>
                <input
                    type="text"
                    className={styles.themeInput}
                    placeholder="Тема предложения"
                    value={themePost.value}
                    onChange={themePost.onChange}
                />
                <div className={styles.imageWrapper}>
                    <img
                        className={styles.choseImage}
                        src={image}
                        alt=""
                    />
                </div>
                <div className={styles.bottomBar}>
                    <div className={styles.clipWrapper}>
                        <img src={getImage('clip')} alt=""/>
                        <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .gif, .svg"
                            onChange={(e) => setImageInput(e)}
                        />
                    </div>
                    <img alt='' src={getImage('send')} onClick={(e) => submitForm(e)}/>
                </div>
            </form>
        </div>
    );
};

export default NewPostModal;