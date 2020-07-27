import React from 'react';
import { mount } from '../../setupTests';
import Game from '.';
import { GameContext } from '../../context/gameContext';
import SwitchButton from '../../UI/Switch';
import Result from '../../components/Result';
import Button from '../../UI/Button';
import Player from '../../components/Player';
import Scoreboard from '../../components/Scoreboard';
import Weapons from '../../components/Weapons';
import Weapon from '../../components/Weapons/Weapon';
import { gameReducer } from '../../context/contextReducer';
import * as AppConstants from '../../config/appConstant';
import * as actionTypes from '../../context/actionConstants';


//Initial state of application
const initialState = {
    gameState: {
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
    },
    onReset: () => {
        expect(gameReducer(initialState.gameState, { type: actionTypes.RESET_GAME })).toEqual(initialState.gameState);
    },
    onWeaponSelected: (weapon) => {
        expect(gameReducer(initialState.gameState, { type: actionTypes.PLAY_GAME, selectedWeapon: weapon })).not.toEqual(initialState.gameState);
    },
    onSwitchPlayerMode: () => {
        expect(gameReducer(initialState.gameState, { type: actionTypes.SWITCH_PLAYER_MODE })).not.toEqual(initialState.gameState);
    },
    onSwitchGameMode: () => {
        expect(gameReducer(initialState.gameState, { type: actionTypes.SWITCH_GAME_MODE })).toEqual(initialState.gameState);
    }
};


describe('<Game/>', () => {

    /*** Common functionality */

    const wrapper = mount(
        <GameContext.Provider value={initialState}>
            <Game />
        </GameContext.Provider>
    );

    it('should mount Game component using context', () => {
        expect(wrapper).not.toBeNull();
        expect(gameReducer(initialState.gameState, { type: actionTypes.SET_GAME_STATE })).toEqual(initialState.gameState);
    })

    it('should mount 2 Switch Button component', () => {
        expect(wrapper.exists(SwitchButton)).toBeTruthy();
        expect(wrapper.find(SwitchButton)).toHaveLength(2);
    })

    it('should mount 2 player components to display weapon selected by them', () => {
        expect(wrapper.exists(Player)).toBeTruthy();
        expect(wrapper.find(Player)).toHaveLength(2);
    })

    it('should mount scoreboard component to display score for each player', () => {
        expect(wrapper.exists(Scoreboard)).toBeTruthy();
        expect(wrapper.find(Scoreboard)).toHaveLength(1);
    })

    it('should mount Result component to display result text', () => {
        expect(wrapper.exists(Result)).toBeTruthy();
        expect(wrapper.find(Result)).toHaveLength(1);
    })

    it('should switch game and player mode', () => {
        const sButton = wrapper.find(SwitchButton);
        sButton.map((btn) => {
            btn.find('input[type="checkbox"]').simulate('change');
        })
    })


    /************* Player mode is Verses ****************/
    it('should mount weapons component when player mode is verses', () => {
        expect(wrapper.exists(Weapons)).toBeTruthy();
        expect(wrapper.find(Weapons)).toHaveLength(1);
    })

    it('should mount only 1 button for Reset game action when player mode is verses', () => {
        expect(wrapper.exists(Button)).toBeTruthy();
        expect(wrapper.find(Button)).toHaveLength(1);
    })

    it('should execute RESET in verses mode', () => {
        const resetButton = wrapper.find(Button);
        expect(resetButton.text()).toEqual('RESET');
        resetButton.simulate('click');
        expect(gameReducer(initialState.gameState, { type: actionTypes.RESET_GAME })).toEqual(initialState.gameState);
    });

    it('should provide winner in verses mode', () => {
        expect(wrapper.exists(Weapons)).toBeTruthy();
        const weaponComps = wrapper.find(Weapons).find(Weapon);
        expect(weaponComps).toHaveLength(3);
        weaponComps.map(weapon => {
            weapon.find('.weapon-box').simulate('click');
        })
    });

    /************* Player mode is Stimulate ****************/

    const updatedState = {
        gameState: {
            ...initialState.gameState,
            'playerMode': {
                'mode': AppConstants.PLAYER_MODES.simulate
            },
        },
        onReset: () => {
            expect(gameReducer(updatedState.gameState, { type: actionTypes.RESET_GAME })).toEqual(updatedState.gameState);
        },
        onWeaponSelected: (weapon) => {
            expect(gameReducer(updatedState.gameState, { type: actionTypes.PLAY_GAME, selectedWeapon: weapon })).not.toEqual(updatedState.gameState);
        },
        onSwitchPlayerMode: () => {
            expect(gameReducer(updatedState.gameState, { type: actionTypes.SWITCH_PLAYER_MODE })).not.toEqual(updatedState.gameState);
        },
        onSwitchGameMode: () => {
            expect(gameReducer(updatedState.gameState, { type: actionTypes.SWITCH_GAME_MODE })).not.toEqual(updatedState.gameState);
        },
        onSimulateGame: () => {
            expect(gameReducer(updatedState.gameState, { type: actionTypes.SIMULATE_GAME })).not.toEqual(updatedState.gameState);
        }
    };
    const stimulateWrapper = mount(
        <GameContext.Provider value={updatedState}>
            <Game />
        </GameContext.Provider>
    );
    it('should not mount weapons component when player mode is stimulate', () => {
        expect(stimulateWrapper.find(Weapons)).toHaveLength(0);
    })

    it('should mount 2 buttons for Start and Reset game action when player mode is stimuator', () => {
        expect(stimulateWrapper.find(Button)).toHaveLength(2);
    })

    it('should execute START & RESET action in stimulate mode', () => {
        const buttons = stimulateWrapper.find(Button);
        buttons.map((btn) => {
            btn.simulate('click');
        })
    })



    /*** ROCK, PAPER, SCISSORS mode  */

    it('should provide winner for Rock, Paper, Scissors game', () => {
        expect(wrapper.exists(Weapons)).toBeTruthy();
        const weaponComps = wrapper.find(Weapons).find(Weapon);
        expect(weaponComps).toHaveLength(3);
        weaponComps.map(weapon => {
            weapon.find('.weapon-box').simulate('click');
            const weaponName = weapon.prop('weapon');
            const result = gameReducer(initialState.gameState, { type: actionTypes.PLAY_GAME, selectedWeapon: weaponName });
            expect(result.player1.weapon).toEqual(weaponName);
            expect(result.player2.weapon).not.toBeNull();
            expect(result.resultText).toEqual(expect.anything());
            expect(result.ties).toBeGreaterThanOrEqual(0);
            expect(result.player1.score).toBeGreaterThanOrEqual(0);
            expect(result.player2.score).toBeGreaterThanOrEqual(0);
        })
    })


    /*** ROCK, PAPER, SCISSORS, LIZARD, SPOCK mode  */

    const rpslsState = {
        gameState: {
            ...initialState.gameState,
            'playerMode': {
                'mode': AppConstants.PLAYER_MODES.verses
            },
            'gameMode': {
                'mode': AppConstants.GAME_MODES.rpsls,
                'weaponList': AppConstants.RPSLS_APP_CONSTANT
            },
        },
        onWeaponSelected: (weapon) => {
            expect(gameReducer(rpslsState.gameState, { type: actionTypes.PLAY_GAME, selectedWeapon: weapon })).not.toEqual(rpslsState.gameState);
        },
    };
    const rpslsWrapper = mount(
        <GameContext.Provider value={rpslsState}>
            <Game />
        </GameContext.Provider>
    );

    it('should provide winner for Rock, Paper, Scissors, Lizard, Spock game', () => {
        expect(rpslsWrapper.exists(Weapons)).toBeTruthy();
        const weaponComps = rpslsWrapper.find(Weapons).find(Weapon);
        expect(weaponComps).toHaveLength(5);
        weaponComps.map(weapon => {
            weapon.find('.weapon-box').simulate('click');
            const weaponName = weapon.prop('weapon');
            const result = gameReducer(rpslsState.gameState, { type: actionTypes.PLAY_GAME, selectedWeapon: weaponName });
            expect(result.player1.weapon).toEqual(weaponName);
            expect(result.player2.weapon).not.toBeNull();
            expect(result.resultText).toEqual(expect.anything());
            expect(result.ties).toBeGreaterThanOrEqual(0);
            expect(result.player1.score).toBeGreaterThanOrEqual(0);
            expect(result.player2.score).toBeGreaterThanOrEqual(0);
        })
    });
})