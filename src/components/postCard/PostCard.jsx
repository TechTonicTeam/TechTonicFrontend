import React, {useEffect, useState} from 'react';
import styles from './PostCard.module.css'
import getImage from "../../utils/getImage";
import {decrementLike, incrementLike} from "../../API/getLike";
import {useSelector} from "react-redux";
import {timestampPost} from "../../utils/getDate";
import TwoCommentList from "../twoCommentList/TwoCommentList";
import {Link} from "react-router-dom";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
const PostCard = ({post, openPopComm, commentButton}) => {
    const api_url = 'http://localhost:5000/'
    const [timestamp, setTimestamp] = useState('')
    const userId = useSelector(state => state.authLevel.id)
    const [openComment, setOpenComment] = useState(false)
    const [likeActive, setLikeActive] = useState(post.likedUser.some(obj => obj.id === userId))
    const [popularComment, setPopularComment] = useState([])
    const setLike = async () => {
        setLikeActive(!likeActive)
        if (!likeActive) {
            await incrementLike({post_id: post.id, user_id: userId})
        } else {
            await decrementLike({post_id: post.id, user_id: userId})
        }
    }

    new Swiper('.swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    useEffect(() => {
        setTimestamp(timestampPost(post.timestamp))
        if (post.comment.length) {
            if (openPopComm) {
                setPopularComment(post.comment)
            } else {
                if (post.comment.length >= 2) {
                    setPopularComment([post.comment[0], post.comment[1]])
                } else {
                    setPopularComment([post.comment[0]])
                }
            }
        }
    }, [post, openPopComm]);



    return (
        <div className={styles.wrapper}>
            <div className={styles.userBlock}>
                <img
                    src={post.user.picture ? post.user.picture : " "}
                    alt=""
                />
                <div className={styles.userInfo}>
                    <span>{post.user.name}</span>
                    <span className={styles.timeStamp}>{timestamp}</span>
                </div>
            </div>

            <div className={styles.aboutPostWrapper}>
                <span>{post.title}</span>
            </div>

            <div className={styles.blockPictures}>

                <div className="swiper">
                    <div className="swiper-wrapper">
                        {
                            post.pictures
                                ?
                                (post.pictures.map(pic => (
                                    <div className='swiper-slide' key={pic.id}>
                                        <img
                                            src={pic.picture ? api_url + 'uploads/' + pic.picture : ''}
                                            alt=""
                                            loading="lazy"
                                            className={styles.postImage}
                                        />
                                    </div>
                                )))
                                :
                                (<></>)
                        }
                    </div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>

            <div className={styles.likeCommentBlock}>
                <div
                    className={styles.likeBlock}
                    onClick={setLike}
                >
                    <img
                        className={styles.like}
                        src={getImage("like")} alt=""
                    />
                    <img
                        className={likeActive ? styles.likeFill + " " + styles.likeFillActive : styles.likeFill}
                            src={getImage("likeFill")}
                            alt=""
                        />
                    </div>
                <Link to={`/post/${post.id}`} className={commentButton ? styles.commentButton : styles.commentButtonActive}>
                    <img
                        className={styles.comment}
                        src={getImage("comment")}
                        alt=""
                        onClick={() => setOpenComment(!openComment)}
                    />
                </Link>
            </div>
            <TwoCommentList comments={popularComment}/>
        </div>
    );
};

export default PostCard;