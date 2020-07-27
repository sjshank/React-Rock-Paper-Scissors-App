import React, { useReducer, useEffect, useCallback, useRef } from 'react';
import * as AppConstants from '../config/appConstant';
import * as actionTypes from './actionConstants';
import { gameReducer } from './contextReducer';

//Initiate context for application to manage high level state
const GameContext = React.createContext(null);

//Initial state of application
const Initial_Game_State = {
    'player1': {
        'score': 0,
        'weapon': null
    },
    'player2': {
        'score': 0,
        'weapon': null
    },
    'winner': null,
    'ties': 0,
    'gameMode': {
        'mode': AppConstants.GAME_MODES.rps,
        'weaponList': AppConstants.RPS_APP_CONSTANT
    },
    'playerMode': {
        'mode': AppConstants.PLAYER_MODES.verses
    },
    'resultText': null
};

/**
 * 
 * Functional component GameContextProvider, responsibel to handle all the Game request and execution of logic. 
 * It uses React Conext API, Hooks and manages complex State of the application using useReducer
 */

const GameContextProvider = (props) => {

    //Initialize state using useReducer and handle all the cases/actions inside gameReducer
    const [gameState, dispatchGameAction] = useReducer(gameReducer, Initial_Game_State);
    const counter = useRef(0);

    //useEffect hook to track gameState and manage locastorage data storing
    useEffect(useCallback(() => {
        //on initial load
        if (counter.current === 0) {
            counter.current = counter.current + 1;
            if (localStorage.getItem("currentState")) {
                //Dispatch SET_GAME_STATE action to set the current state
                dispatchGameAction({ type: actionTypes.SET_GAME_STATE, currentState: JSON.parse(localStorage.getItem("currentState")) })
            }
        } else {
            counter.current = counter.current + 1;
            if (localStorage) {
                localStorage.setItem("currentState", JSON.stringify(gameState));
            }
        }
    }, [gameState]));

    /**
     *  Switch Gaming mode from RPS to RPSLS or vice-versa
     */
    const switchGameMode = () => {
        const _currentGameMode = gameState.gameMode.mode['value'];
        //Reset score before switching game mode
        dispatchGameAction({ type: actionTypes.RESET_GAME });
        //Dispatch Game switch action
        dispatchGameAction({ type: actionTypes.SWITCH_GAME_MODE, currentMode: _currentGameMode });
    }

    /**
     *  Switch Player mode from verses to stimulate or vice-verse
     */
    const switchPlayerMode = () => {
        const _currentPlayerMode = gameState.playerMode.mode['value'];
        //Reset score before switching game mode
        dispatchGameAction({ type: actionTypes.RESET_GAME });
        //Dispatch Player switch action
        dispatchGameAction({ type: actionTypes.SWITCH_PLAYER_MODE, currentMode: _currentPlayerMode });
    }

    /**
     *  Execute logic and get the winner
     */
    const selectWeapon = (weapon) => {
        dispatchGameAction({ type: actionTypes.PLAY_GAME, selectedWeapon: weapon });
    }

    /**
     *  Reset game and score
     */
    const resetGame = () => {
        dispatchGameAction({ type: actionTypes.RESET_GAME, initialState: Initial_Game_State });
    }

    /**
    *  Execute stimulate mode
    */
    const simulateGame = () => {
        dispatchGameAction({ type: actionTypes.SIMULATE_GAME });
    }

    return (
        // populate context provider
        <GameContext.Provider value={{
            gameState: gameState,
            onSwitchGameMode: switchGameMode,
            onSwitchPlayerMode: switchPlayerMode,
            onWeaponSelected: selectWeapon,
            weaponList: gameState.gameMode.weaponList,
            onReset: resetGame,
            onSimulateGame: simulateGame
        }}>
            {props.children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };