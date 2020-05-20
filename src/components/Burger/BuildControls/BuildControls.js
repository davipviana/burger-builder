import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        {controls.map(ctrl => <BuildControl key={ctrl.label} label={ctrl.label} />)}
    </div>
);

export default BuildControls;