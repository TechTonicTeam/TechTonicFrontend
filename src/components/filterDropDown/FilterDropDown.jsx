import React, {useMemo, useState} from 'react';
import styles from "./FilterDropDown.module.css";
import getImage from "../../utils/getImage";
import useInput from "../../hooks/useInput";

const FilterDropDown = () => {

    const tagList = ["#топ", "#лучшее", "#дом", "#работа", "#люди"]
    const [tagsDropDown, setTagsDropDown] = useState(false)
    const [filterDropDown, setFilterDropDown] = useState(false)
    const value = useInput("")
    const [selectedTags, setSelectedTags] = useState([]);
    const resultTags = useMemo(() => {
        if (value.value === "") {
            return tagList
        } else {
            return tagList.filter(item => item.toLowerCase().includes(value.value.toLowerCase()))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value.value])

    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (

        <div className={styles.filterBar}>
            <div className={(filterDropDown ? styles.filterIcon + " " + styles.activeFilterIcon : styles.filterIcon)}>
                <img
                    onClick={() => setFilterDropDown(!filterDropDown)}
                    src={getImage("filterIcon")}
                    alt="#"
                />
            </div>
            <div className={filterDropDown ? styles.filterDropDown : styles.filterDropDown + " " + styles.filterDropDownClose}>
                <div className={styles.reactions}>
                    <span>По моим реакциям</span>
                    <input type="checkbox"/>
                </div>
                <div
                    className={styles.tags}
                    onClick={() => setTagsDropDown(!tagsDropDown)}
                >
                    <span>По тегам</span>
                    <div className={styles.arrowWrapper}>
                        <img
                            src={getImage('arrowDown')}
                            alt="#"
                        />
                    </div>
                </div>
                <div className={tagsDropDown ? styles.tagSearchWrapper : styles.tagSearchWrapper + " " + styles.tagSearchClose}>
                    <div className={styles.tagSearchInput}>
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={value.value}
                            onChange={value.onChange}
                        />
                        <img
                            src={getImage("search")}
                            alt=""
                        />
                    </div>

                    <div className={styles.tagsList}>
                        {
                            tagList.length > 0
                                ?
                                resultTags.map(tag => (
                                    <div
                                        className={styles.tag}
                                        key={tag}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagSelection(tag)}
                                        />
                                        <span>{tag}</span>
                                    </div>
                                ))
                                :
                                <span>Тегов пока нет : (</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterDropDown;