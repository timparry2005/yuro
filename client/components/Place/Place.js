import React, {PropTypes} from 'react';

import style from './place.css';

const Place = (props) => {
    const styles = props.selected ? `${style.root} ${style.selected}` : `${style.root}`;

    const handleClick = () => {
        console.log(props)
          props.actions.addSelected(props.group, props.name, props.place);
    }
    return (
        <a className={styles} onClick={handleClick}>
            {props.place}
        </a>
    );
};

export default Place;
