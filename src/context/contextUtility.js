import * as AppConstants from '../config/appConstant';

/**
 * Method responsible to switch gaming mode and populate respective state objects
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const switchGamingMode = (state, action) => {
    if (localStorage) {
        localStorage.removeItem("currentState");
    }
    const _mode = action.currentMode === 'rps' ? AppConstants.GAME_MODES.rpsls : AppConstants.GAME_MODES.rps;
    const _weaponList = action.currentMode === 'rps' ? AppConstants.RPSLS_APP_CONSTANT : AppConstants.RPS_APP_CONSTANT;
    return {
        ...state,
        gameMode: {
            ...state.gameMode,
            mode: _mode,
            weaponList: _weaponList
        }
    }
};

/**
 * Method responsible to switch playing mode and populate respective state objects
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const switchPlayingMode = (state, action) => {
    if (localStorage) {
        localStorage.removeItem("currentState");
    }
    const _mode = action.currentMode === 'verses' ? AppConstants.PLAYER_MODES.simulate : AppConstants.PLAYER_MODES.verses;
    return {
        ...state,
        playerMode: {
            ...state.gameMode,
            mode: _mode,
        }
    }
};

/**
 * Method responsible to load current state from localstorage if user refreshes page
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const loadCurrentState = (state, action) => {
    return {
        ...state,
        ...JSON.parse(localStorage.getItem("currentState"))
    }
};

/**
 * Method responsible to reset state and remove localstorage
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const resetGame = (state, action) => {
    if (localStorage) {
        localStorage.removeItem("currentState");
    }
    return {
        ...state,
        player1: {
            ...state.player1,
            weapon: null,
            score: 0
        },
        player2: {
            ...state.player1,
            weapon: null,
            score: 0
        },
        ties: 0,
        winner: null,
        resultText: null
    }
}

/**
 * Method responsible to execute RPS and RPSLS rules and populate winner along with result text and scoreboard
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const getWinner = (state, action) => {
    const _gameMode = state.gameMode;
    const _playerMode = state.playerMode;
    const _player1Weapon = _playerMode.mode.value === 'verses' ? action.selectedWeapon : getRandomWeapon(_gameMode);
    const _player2Weapon = getRandomWeapon(_gameMode);
    const _rules = populateRules(_gameMode, _player1Weapon);
    const _winner = populateWinner(_player2Weapon, _player1Weapon, _rules);
    const _resultText = (_winner === 'tie' ? "It's a tie !!!" : getResultText(`${_player1Weapon.toLowerCase()},${_player2Weapon.toLowerCase()}`));

    const updatedState = {
        ...state,
        player1: {
            ...state.player1,
            weapon: _player1Weapon,
            score: _winner === 'player1' ? state.player1.score + 1 : state.player1.score
        },
        player2: {
            ...state.player1,
            weapon: _player2Weapon,
            score: _winner === 'player2' ? state.player2.score + 1 : state.player2.score
        },
        ties: _winner === 'tie' ? state.ties + 1 : state.ties,
        resultText: _resultText
    };

    localStorage.setItem("currentState", JSON.stringify(updatedState));

    return updatedState;
};

//Utility to generate random weapon
export const getRandomWeapon = (gameMode) => {
    const index = gameMode.weaponList.length * Math.random() << 0;
    return gameMode.weaponList[index];
};

//Utility to execute rules based on RPS/RPSLS
export const populateRules = (gameMode, sWeapon) => {
    return gameMode.mode.value === 'rps' ? AppConstants.RPS_WEAPONS[sWeapon] : AppConstants.RPSLS_WEAPONS[sWeapon];
};

//Utility to populate winner
export const populateWinner = (randomWeapon, selectedWeapon, rules) => {
    if (randomWeapon === selectedWeapon) {
        return 'tie';
    } else {
        return rules.some((weapon) => {
            return weapon === randomWeapon;
        }) ? 'player1' : 'player2'
    }
};

//Utility to populate result text
const getResultText = (result) => {
    if (['rock,lizard', 'lizard,rock'].indexOf(result) > -1)
        return 'Rock crushes lizard!';
    else if (['rock,scissors', 'scissors,rock'].indexOf(result) > -1)
        return 'Rock crushes scissors!';
    else if (['paper,rock', 'rock,paper'].indexOf(result) > -1)
        return 'Paper covers rock!';
    else if (['paper,spock', 'spock,paper'].indexOf(result) > -1)
        return 'Paper disproves Spock!';
    else if (['scissors,paper', 'paper,scissors'].indexOf(result) > -1)
        return 'Scissors cuts paper!';
    else if (['scissors,lizard', 'lizard,scissors'].indexOf(result) > -1)
        return 'Scissors decapitates lizard!';
    else if (['lizard,spock', 'spock,lizard'].indexOf(result) > -1)
        return 'Lizard poisons Spock!';
    else if (['lizard,paper', 'paper,lizard'].indexOf(result) > -1)
        return 'Lizard eats paper!';
    else if (['spock,scissors', 'scissors,spock'].indexOf(result) > -1)
        return 'Spock smashes scissors!';
    else if (['spock,rock', 'rock,spock'].indexOf(result) > -1)
        return 'Spock vaporizes rock!';
    else
        return 'Something went wrong...';
}