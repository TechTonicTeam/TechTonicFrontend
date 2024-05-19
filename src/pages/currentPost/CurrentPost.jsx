import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import $api from "../../http";
import {useFetching} from "../../hooks/useFetching";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";
import styles from './CurrentPost.module.css'
import PostCard from "../../components/postCard/PostCard";
import getImage from "../../utils/getImage";
import useInput from "../../hooks/useInput";
import {useSelector} from "react-redux";

function CurrentPost() {
    const [post, setPost] = useState(null)
    const user_id = useSelector(state => state.authLevel.id)
    const [fetching, isLoading] = useFetching(async () => {
        const response = await $api.get(`/post/one-post?post_id=${postId.post_id}`)
        setPost(response.data)
    })
    const commentInput = useInput('')
    const postId = useParams()

    async function sendCommentHandler() {
        if (commentInput.value) {
            const date = new Date()
            await $api.post('/comment', {
                title: commentInput.value,
                timestamp: date.toLocaleString('en-US', {timeZone: 'Europe/Moscow'}),
                user_id: user_id,
                post_id: post.id
            })
            fetching()
        }
    }

    useEffect(() => {
        fetching()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (<LoadingComponent />)
    }

    if (!post) {
        return (<h3 className={styles.wrapper}>Запись не найдена :(</h3>)
    }

    return (
        <div className={styles.wrapp}>
            <div className={styles.wrapper}>
                <div className={styles.wrapperHeader}>
                    <Link to='/'>
                        <img src={getImage('arrowDown')} alt="" className={styles.arrow}/>
                    </Link>
                    <p className={styles.headerText}>Запись на стене</p>
                </div>
                <PostCard post={post} openPopComm={true} commentButton={true}/>
                <div className={styles.inputWrapper}>
                    <img src={getImage('send')} alt="" className={styles.sendButton} onClick={sendCommentHandler}/>
                    <input {...commentInput} type="text" placeholder='Оставьте свой комментарий' className={styles.commentInput}/>
                </div>
            </div>
        </div>
)
}

export default CurrentPost;