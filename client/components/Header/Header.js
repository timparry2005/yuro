import React, {PropTypes} from 'react';

import style from './header.css';


const Header = (props) => {

  return (
    <header className={style.header}>
        <img className={style.logo} width='76px' height='21px' src='img/logos/skybet.png'/>
        <h1>
            <span className={style.euro}>Euro2016</span>
            <span className={style.predictor}>Predictor</span>
            <span className={style.france}>France</span>
        </h1>
    </header>
  );
};

export default Header;
