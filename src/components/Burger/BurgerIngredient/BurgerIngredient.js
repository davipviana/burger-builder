import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.module.css';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = getBreadBottom();
            break;
        case ('bread-top'):
            ingredient = getBreadTop();
            break;
        case ('meat'):
            ingredient = getMeat();
            break;
        case ('cheese'):
            ingredient = getCheese();
            break;
        case ('salad'):
            ingredient = getSalad();
            break;
        case ('bacon'):
            ingredient = getBacon();
            break;
        default:
            throw new Error('Unsupported ingredient type');
    }

    return ingredient;
}

const getBreadBottom = () => (<div className={styles.BreadBottom}></div>);

const getBreadTop = () => (
    <div className={styles.BreadTop}>
        <div className={styles.Seeds1}></div>
        <div className={styles.Seeds2}></div>
    </div>
);

const getMeat = () => (<div className={styles.Meat}></div>);

const getCheese = () => (<div className={styles.Cheese}></div>);

const getSalad = () => (<div className={styles.Salad}></div>);

const getBacon = () => (<div className={styles.Bacon}></div>);

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
