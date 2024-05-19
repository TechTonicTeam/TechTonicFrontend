import React from 'react';
import styles from './SortFilterBar.module.css'
import SortDropDown from "../sortDropDown/SortDropDown";
import FilterDropDown from "../filterDropDown/FilterDropDown";

const SortFilterBar = () => {



    return (
        <div className={styles.wrapper}>
            <SortDropDown/>
            <FilterDropDown/>
        </div>
    );
};

export default SortFilterBar;