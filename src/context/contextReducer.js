import * as actionTypes from './actionConstants';
import * as helper from './contextUtility';

/**
 * Reducer to handle all the dispatched action from GameContext
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const gameReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SWITCH_GAME_MODE:
            return helper.switchGamingMode(state, action);
        case actionTypes.SWITCH_PLAYER_MODE:
            return helper.switchPlayingMode(state, action);
        case actionTypes.PLAY_GAME:
            return helper.getWinner(state, action);
        case actionTypes.RESET_GAME:
            return helper.resetGame(state, action);
        case actionTypes.SIMULATE_GAME:
            return helper.getWinner(state, action);
        case actionTypes.SET_GAME_STATE:
            return helper.loadCurrentState(state, action);
        default:
            return state;
    }
};

