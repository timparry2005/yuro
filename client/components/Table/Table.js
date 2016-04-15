import React, {PropTypes} from 'react';
import style from './Table.css';
import Place from '../Place';
import store from '../../store/configureStore';

const Table = (props) => {
  const {actions, teams, group} = props;
// console.log('*********************')
// console.log('group',group)
// console.log('********************')
// console.log('teams',teams)
// console.log('********************')

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
                    <th colSpan='7'>Group {teams}</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(group).map((team, idx) => {

                    const flag = `img/flags/${group[team].flag}.png`;
                    const trtype = idx % 2=== 1 ? 'trodd' : 'treven';
                    return <tr key={idx} className={`${style[trtype]}`}>
                        <td key={'1'} className={style.tdflag}><img width='32px' height='24px' src={flag}/></td>
                        <td key={'2'} className={style.teamName}>{team.name}</td>
                        {

                            [1,2,3,4].map((num)=>{
                                let sel = false;
                                // console.log(group[team]['g'+num])
                                if (group[team]['g'+num].hasOwnProperty('selected')) {
                                    sel = group[team]['g'+num].selected;
                                }
                                return <td key={'g'+num}><Place group={teams} actions={actions} place={num} selected={sel} name={group[team].name}/></td>
                            })
                        }

                        <td key={'3'} className={style.price}>{group[team].selectedPrice}</td>
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
