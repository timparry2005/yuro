import React, {PropTypes} from 'react';

import style from './versus.css';

const Versus = (props) => {

    const team1 = `${style.team} ${style.team1}`
    const team2 = `${style.team} ${style.team2}`

    return (
        <div className={style.root}>
            <div className={team1}>
                England
            </div>
            <div className={style.v}><span className={style.vSpan}>V</span></div>
            <div className={team2}>
                France
            </div>
        </div>
    );
};

export default Versus;
