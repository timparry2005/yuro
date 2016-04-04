import * as types from '../constants/ActionTypes';
import { Map as map, fromJS } from 'immutable';

const intialState = map({
    "teams": map(),
    "groups": map()
});

export default function odds(state = intialState, action) {
    console.log('action:',action)
    console.log(state)
    switch (action.type) {
            case types.ADD_SELECTED:
                return state.setIn(['teams', 'A', 'Albania', 'g1'], true);
                // return {
                //     ...state,
                //     Object.assign({}, state)
                // };
            case types.FETCH_ODDS_SUCCESS:
                return state.set('teams', action.odds);
            default:
                return state;
    }


}
