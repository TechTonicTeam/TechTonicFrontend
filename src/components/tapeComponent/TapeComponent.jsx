import React, {useEffect, useState} from 'react';
import PostCard from "../postCard/PostCard";
import styles from './TapeComponent.module.css'
import {useSelector} from "react-redux";
import SortFilterBar from "../sortFilterBar/SortFilterBar";
import NewPostButton from "../newPostButton/NewPostButton";
import {getPosts} from "../../API/getPosts";
import {useFetching} from "../../hooks/useFetching";
import LoadingComponent from "../loadingComponent/LoadingComponent";
const TapeComponent = () => {
    const userId = useSelector(state => state.authLevel.id)
    const switchTape = useSelector(state => state.switchTape.switch)
    const sorting = useSelector(state => state.sortingSlice.sorting)
    const [posts, setPosts] = useState([])
    const [fetchingPost, loadingPost, errorPost] = useFetching(async () => {
        const postList = await getPosts(userId, sorting)
        setPosts(postList.data)
    })

    useEffect(() => {
        fetchingPost()
        if (!!errorPost) {
            alert(errorPost)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorPost, sorting]);
    return (
        <div className={styles.wrapper}>
            {
                switchTape
                    ?
                    <div>
                        Лента голосований пока в разработке
                        <LoadingComponent/>
                    </div>
                    :
                    <div className={styles.wrapper}>
                        <SortFilterBar/>
                        {loadingPost
                            ?
                            <LoadingComponent/>
                            :
                            posts.map(post => (
                                <PostCard openPopComm={false} key={post.id} post={post}/>
                            ))
                        }

                        <NewPostButton setPost={setPosts}/>
                    </div>
            }
        </div>
    );
};

export default TapeComponent;