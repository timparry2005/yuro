import React, {PropTypes} from 'react';
import style from './MainSection.css';
import Table from '../Table';
import Stage from '../Stage';
import Knockout from '../Knockout';
import { toJS } from 'immutable';

const MainSection = (props) => {
    const {actions, odds} = props;
    const handlePositionSelected = () => actions.addSelected();
    // const groupTeams = (teams) => {
    //     let g = {}
    //     teams.forEach((team) => {
    //         if (!g[team.group]) g[team.group] = {};
    //             g[team.group][team.name] = team;
    //         })
    //     return g;
    // }

    const groupTeams = (teams) => {
        return teams.reduce((groupedTeams, team) => {
            console.log('s:',groupedTeams[team.group])
            console.log('groupedTeams',groupedTeams)
            if(!groupedTeams[team.group][team.flag]) {
                groupedTeams[team.group][team.flag] = {}
            }
            groupedTeams[team.group][team.flag] = team;
            return groupedTeams;
        },
        {
            'A': {},
            'B': {},
            'C': {},
            'D': {},
            'E': {},
            'F': {},
        })
    }
    // return outcomes.reduce(
    //     (groupedOutcomes, outcome) => {
    //         groupedOutcomes[outcome.type.toLowerCase()].push(outcome);
    //         return groupedOutcomes;
    //     },
    //     {
    //         home: [],
    //         draw: [],
    //         away: []
    //     }
    // );

    const groups = groupTeams(odds.get('teams').toJS());
    console.log(groups)

    //what we need is

    return (
    <div>
        <Stage title={'1. Group Stage'} body={'Choose the 16 teams that will reach the knock-out rounds - 6 group winners + 6 runners up + 4 third place finishes'}/>
        <section className={style.root}>
            {

                Object.keys(groups).map((group, idx)=>{
                    // console.log('groups[group]',groups[group])
                    return <Table teams={group} group={groups[group]} onClickSelect={handlePositionSelected} actions={actions} key={idx}/>
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
