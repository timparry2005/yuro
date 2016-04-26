import React, {PropTypes} from 'react';

import style from './price.css';

const Price = (props) => {
    const { actions, price, betsInSlip} = props;

    const styles = price && betsInSlip.has(price.id) ? `${style.root} ${style.selected}` : `${style.root}`;
    const priceText = price ? price.lp_num + '/' + price.lp_den : '-';
    const handleClick = () => {
        props.price ? props.actions.addToBetslip(price) : false;
    }

    return (
        <td key={'3'} className={styles} onClick={handleClick}>{priceText}</td>
    );
};

export default Price;
