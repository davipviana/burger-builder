import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = (props) => (
    props.visible
        ? <div className={styles.Backdrop} onClick={props.onClick}></div>
        : null
);

export default Backdrop;
