import * as types from '../constants/ActionTypes';
import { Map, fromJS, List} from 'immutable';

const intialState = Map({
    "teams": Map(),
    "groups": Map(),
    "betSlip": Map()
});

const groupTeams = (teams) => {
    return teams.reduce((groupedTeams, team) => {
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

export default function odds(state = intialState, action) {

    switch (action.type) {
            case types.FETCH_ODDS_SUCCESS:
                return state.set('teams', fromJS(groupTeams(action.odds)));
            case types.ADD_SELECTED:
                const newSelection = state.getIn(['teams', action.group, action.flag.toLowerCase(), 'g' + action.place]);
                if (state.get('groups').size != 0 && state.get('groups').has(action.group)) {
                    //check thats its not already selected, if it is deselect
                    if (action.flag === state.get('groups').get(action.group).get(action.place)){
                        return state.deleteIn(['groups', action.group, action.place])
                            .setIn(['teams', action.group, action.flag.toLowerCase(), 'g' + action.place, 'selected'],false)
                    }

                    const places = state.get('groups').get(action.group).toObject();
                    let removeKeyPlace;
                    Object.keys(places).forEach(function(key) {
                        if(places[key] === action.flag){
                            removeKeyPlace = parseInt(key,10);
                        }
                    })

                    let currentPlaceTeamToRemove;
                    if (state.get('groups').get(action.group).get(action.place)){
                        currentPlaceTeamToRemove = state.get('groups').get(action.group).get(action.place).toLowerCase();
                    }

                    if(removeKeyPlace && currentPlaceTeamToRemove) {
                        return state
                            .setIn(['groups', action.group, action.place], action.flag)
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .deleteIn(['teams', action.group, action.flag.toLowerCase(), 'g' + removeKeyPlace, 'selected'])
                            .deleteIn(['teams', action.group, currentPlaceTeamToRemove, 'g' + action.place, 'selected'])
                            .setIn(['teams', action.group, action.flag.toLowerCase(), 'g'+ action.place, 'selected'], true)
                    }

                    if(removeKeyPlace) {
                        return state
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .setIn(['groups', action.group, action.place],  action.flag)
                            .setIn(['teams',action.group, action.flag.toLowerCase(), 'g' + action.place, 'selected'], true)
                            .deleteIn(['teams',action.group, action.flag.toLowerCase(), 'g' + removeKeyPlace, 'selected']);
                    }

                    if(currentPlaceTeamToRemove) {
                        return state
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .setIn(['groups', action.group, action.place],  action.flag)
                            .deleteIn(['teams', action.group, currentPlaceTeamToRemove, 'g' + action.place, 'selected'])
                            .setIn(['teams',action.group, action.flag.toLowerCase(), 'g' + action.place, 'selected'], true);
                    }
                    return state.setIn(['groups', action.group, action.place], action.flag)
                        .setIn(['teams',action.group, action.flag.toLowerCase(), 'g' + action.place, 'selected'], true);

                }
                return state.setIn(['groups', action.group, action.place], action.flag)
                    .setIn(['teams',action.group, action.flag.toLowerCase(), 'g' + action.place, 'selected'], true);
            case types.ADD_TO_BETSLIP:
                const blob = fromJS({
                    id: [action.props.id],
                    num: [action.props.lp_num],
                    den: [action.props.lp_den]
                })
                const blobId = [action.props.id].toString();
                if(state.get('betSlip').includes(blob)){
                    return state.deleteIn(['betSlip', blobId])
                } else {
                    return state.setIn(['betSlip', blobId],blob)
                };
            default:
                return state;
    }


}
