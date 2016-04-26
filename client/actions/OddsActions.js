import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function fetchOddsSuccess (odds) {
    return { type: types.FETCH_ODDS_SUCCESS, odds };
}

export function addSelected (group, flag, place) {
    return {type: types.ADD_SELECTED, group, flag, place};
}

export function addToBetslip (props) {
    return {type: types.ADD_TO_BETSLIP, props};
}

export function fetchOdds () {
  const API = process.env.API || 'http://localhost:3000/api';

  return (dispatch) => {
    return fetch(`${API}/odds`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchOddsSuccess(json)))
      .catch((error) => console.log(error)); // eslint-disable-line no-console
  };
}
