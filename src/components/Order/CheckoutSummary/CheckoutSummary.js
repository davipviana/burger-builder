import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', height: '300px', magin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="Danger">CANCEL</Button>
            <Button type="Success">CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;