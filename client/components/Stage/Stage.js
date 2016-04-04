import React, {PropTypes} from 'react';

import style from './stage.css';

const Stage = (props) => {

  return (
    <section className={style.root}>
        <h2 className={style.title}>{props.title}</h2>
        <p>{props.body}</p>
    </section>
  );
};

export default Stage;
