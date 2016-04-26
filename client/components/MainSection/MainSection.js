import React, {PropTypes} from 'react';
import style from './MainSection.css';
import Table from '../Table';
import AddToBetslip from '../AddToBetslip';
import Stage from '../Stage';
import Versus from '../Versus';
import { toJS } from 'immutable';

const MainSection = (props) => {
    const {actions, odds} = props;
    const handlePositionSelected = () => actions.addSelected();
    const groups = odds.get('teams').toJS();
    const betsInSlip = odds.get('betSlip');

    return (
    <div>
        <Stage title={'1. Group Stage'} body={'Choose the 16 teams that will reach the knock-out rounds - 6 group winners + 6 runners up + 4 third place finishes'}/>
        <section className={style.section}>
            {
                Object.keys(groups).map((group, idx)=>{
                    return <Table teams={group} group={groups[group]} onClickSelect={handlePositionSelected} actions={actions} key={idx}
                    betsInSlip={betsInSlip}/>
                })
            }

        </section>
        <Stage title={'2. Knock-outs'} body={'Pick the winner from each match'}/>
        <section className={style.section}>
            <Versus/><Versus/><Versus/>
        </section>
        <AddToBetslip betsInSlip={betsInSlip}/>
    </div>
  );
};

MainSection.propTypes = {
};

export default MainSection;
