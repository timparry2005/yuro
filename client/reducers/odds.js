import * as types from '../constants/ActionTypes';
import { Map, fromJS, groupBy } from 'immutable';

const intialState = Map({
    "teams": Map(),
    "groups": Map()
});

export default function odds(state = intialState, action) {

    switch (action.type) {
            case types.FETCH_ODDS_SUCCESS:
                return state.set('teams', fromJS(action.odds));
            case types.ADD_SELECTED:
                const newSelection = state.getIn(['teams', action.group, action.name.toLowerCase(), 'g' + action.place]);
                if (state.get('groups').size != 0 && state.get('groups').has(action.group)) {
                    //check thats its not already selected, if it is deselect
                    if (action.name === state.get('groups').get(action.group).get(action.place)){
                        return state.deleteIn(['groups', action.group, action.place])
                            .setIn(['teams', action.group, action.name.toLowerCase(), 'g' + action.place, 'selected'],false)
                    }

                    const places = state.get('groups').get(action.group).toObject();
                    let removeKeyPlace;
                    Object.keys(places).forEach(function(key) {
                        if(places[key] === action.name){
                            removeKeyPlace = parseInt(key,10);
                        }
                    })

                    let currentPlaceTeamToRemove;
                    if (state.get('groups').get(action.group).get(action.place)){
                        currentPlaceTeamToRemove = state.get('groups').get(action.group).get(action.place).toLowerCase();
                    }

                    if(removeKeyPlace && currentPlaceTeamToRemove) {
                        return state
                            .setIn(['groups', action.group, action.place], action.name)
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .deleteIn(['teams', action.group, action.name.toLowerCase(), 'g' + removeKeyPlace, 'selected'])
                            .deleteIn(['teams', action.group, currentPlaceTeamToRemove, 'g' + action.place, 'selected'])
                            .setIn(['teams', action.group, action.name.toLowerCase(), 'g'+ action.place, 'selected'], true)
                    }

                    if(removeKeyPlace) {
                        return state
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .setIn(['groups', action.group, action.place],  action.name)
                            .setIn(['teams',action.group, action.name.toLowerCase(), 'g' + action.place, 'selected'], true)
                            .deleteIn(['teams',action.group, action.name.toLowerCase(), 'g' + removeKeyPlace, 'selected']);
                    }

                    if(currentPlaceTeamToRemove) {
                        return state
                            .deleteIn(['groups', action.group, removeKeyPlace])
                            .setIn(['groups', action.group, action.place],  action.name)
                            .deleteIn(['teams', action.group, currentPlaceTeamToRemove, 'g' + action.place, 'selected'])
                            .setIn(['teams',action.group, action.name.toLowerCase(), 'g' + action.place, 'selected'], true);
                    }
                    return state.setIn(['groups', action.group, action.place], action.name)
                        .setIn(['teams',action.group, action.name.toLowerCase(), 'g' + action.place, 'selected'], true);

                }
                return state.setIn(['groups', action.group, action.place], action.name)
                    .setIn(['teams',action.group, action.name.toLowerCase(), 'g' + action.place, 'selected'], true);
            default:
                return state;
    }


}
