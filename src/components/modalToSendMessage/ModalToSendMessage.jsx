import React, { useState, useEffect } from 'react';
import styles from './ModalToSendMessage.module.css'
import getImage from "../../utils/getImage";
import useInput from "../../hooks/useInput";
import {createMessage} from "../../API/getMessage";

const ModalToSendMessage = ({modalActive,handleClose}) => {
    const themePost = useInput("")
    const textpost = useInput("")
    const [images, setImages] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [file, setFile] = useState(null)
    const date = new Date()

    useEffect(() => {
        modalActive
            ?
            document.body.style.overflow = "hidden"
            :
            document.body.style.overflow = "unset"
    }, [modalActive]);

    const setImageInput = (e) => {
        console.log(e.target.files);
        if (Object.hasOwn(e.target.files, '0')) {
            const imagesInEvent = e.target.files
            setImageName(Object.values(imagesInEvent).map(file => file.name))
            setImages(Object.values(imagesInEvent).map(file => URL.createObjectURL(file)))
            setFile(imagesInEvent)
        }
    }
    
    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', themePost.value)
        formData.append('text', textpost.value)
        formData.append('timestamp', date.toLocaleString('en-US', {timeZone: 'Europe/Moscow'}))
        const newMessage = await createMessage(formData)
    }
    
    console.log(imageName)
    return (
        <div className={styles.toSendrapper}>
            <div className={styles.toSendBlock}>
                <div className={styles.toSendFormMain}>
                    <div className= {styles.toSendHead}>
                        <p>Новое сообщение</p>
                        <span className={styles.toSendExit} onClick={handleClose}></span>
                    </div>
                    <form className={styles.modalInner}>
                            <input className={styles.toSendInputTheme} type="text" placeholder="Тема предложения" value={themePost.value} onChange={themePost.onChange}/>
                            <textarea className={styles.toSendInputText} type="text" placeholder="Текст предложения" value={textpost.value} onChange={textpost.onChange}/>
                            {images
                                    ?
                                    images.map(image => (
                                    <>
                                        <div key={'DIV' + imageName[images.indexOf(image)]} className={styles.choseImageDiv}>
                                            <img key={image} className={styles.choseImage} src={image} alt=""/>
                                            <span key={imageName[images.indexOf(image)]} className={styles.choseImageName}>{imageName[images.indexOf(image)]}</span>
                                        </div>
                                        <hr width="100%" size="1" color='D9D9D9'/>
                                    </>
                                    ))
                                    :
                                    <></>
                                }
                    </form>
                </div>
                <div className={styles.toSendButton}>
                    <div className={styles.toSendSend}>
                        <img className={styles.toSendAttachImage} src={getImage("clip")} alt="send" />
                        <input className={styles.toSendButAttach} type="file" accept=".jpg, .png, .jpeg, .gif, .svg" size={0} onChange={(e) => setImageInput(e)} multiple/>
                    </div>
                    <div className={styles.toSendAttach}>
                        <img className={styles.toSendSendImage} src={getImage("send")} alt="attach" />
                        <button className={styles.toSendButSend} onClick={(e) => submitForm(e)} src={getImage("report")}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalToSendMessage;