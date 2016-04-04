import React, {PropTypes} from 'react';
import style from './Table.css';
import Place from '../Place';
import store from '../../store/configureStore';

const Table = (props) => {
  const {actions, teams} = props;

  return (
        <table className={style.table}>
            <colgroup>
                <col className={style.colFlag}/>
                <col className={style.colName}/>
                <col className={style.col}/>
                <col className={style.col}/>
                <col className={style.col}/>
                <col className={style.col}/>
                <col className={style.col}/>

            </colgroup>
            <thead className={style.thead} colSpan='7'>
                <tr>
                    <th colSpan='7'>Group {props.group}</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(teams).map((team, idx) => {
                    const flag = `img/flags/${teams[team].flag}.png`;
                    const trtype = idx % 2=== 1 ? 'trodd' : 'treven';
                    return <tr key={idx} className={`${style[trtype]}`}>
                        <td key={'1'} className={style.tdflag}><img width='32px' height='24px' src={flag}/></td>
                        <td key={'2'} className={style.teamName}>{team.name}</td>
                        {


                            [1,2,3,4].map((num)=>{
                                return <td key={'g'+num}><Place group={props.group} actions={actions} place={num} selected={teams[team]['g'+num].selected} name={teams[team].name}/></td>
                            })
                        }

                        <td key={'3'} className={style.price}>{teams[team].selectedPrice}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
  );
};

Table.propTypes = {
};

export default Table;
