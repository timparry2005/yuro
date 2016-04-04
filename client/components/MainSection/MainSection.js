import React, {PropTypes} from 'react';
import style from './MainSection.css';
import Table from '../Table';
import Stage from '../Stage';
import Knockout from '../Knockout';

const MainSection = (props) => {

  const {actions, odds} = props;
  const groupTeams = (teams) => {
    let g = {}
    teams.forEach((team) => {
        if (!g[team.group]) g[team.group] = {};
        g[team.group][team.name] = team;
    })
    return g;
  }

  const handlePositionSelected = () => actions.addSelected();


  const groups = groupTeams(odds.get('teams'));
  return (
    <div>
        <Stage title={'1. Group Stage'} body={'Choose the 16 teams that will reach the knock-out rounds - 6 group winners + 6 runners up + 4 third place finishes'}/>
        <section className={style.root}>
            {

                Object.keys(groups).map((group, idx)=>{
                    return <Table teams={groups[group]} group={group} onClickSelect={handlePositionSelected} actions={actions} key={idx}/>
                })
            }

        </section>
        <Stage title={'2. Knock-outs'} body={'Pick the winner from each match'}/>
        <Knockout/>
    </div>
  );
};

MainSection.propTypes = {
};

export default MainSection;
