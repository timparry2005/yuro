import React, {PropTypes} from 'react';

import style from './place.css';

const Place = (props) => {
    const styles = props.selected ? `${style.root} ${style.selected}` : `${style.root}`;
    const handleClick = () => {
          props.actions.addSelected(props.group, props.flag, props.place);
    }
    const ordinalNumber = ['1st','2nd','3rd','4th'][parseInt(props.place,10) -1];

    return (

        <a className={styles} onClick={handleClick}>
            {ordinalNumber}
        </a>
    );
};

export default Place;
