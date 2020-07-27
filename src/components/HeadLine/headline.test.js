import React from 'react';
import { mount } from '../../setupTests';
import Headline from '.';
import { GameContext } from '../../context/gameContext';

describe('<Headline/>', () => {
    const gameContext = {
        gameState: {
            gameMode: {
                mode: {
                    label: 'rock, paper, scissors'
                }
            }
        }
    };
    const wrapper = mount(
        <GameContext.Provider value={gameContext}>
            <Headline />
        </GameContext.Provider>
    );

    it('should mount Headline component using context', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should create a context of game state and render rock, paper, scissors as label', () => {
        expect(wrapper.find('h1').text()).toEqual('rock, paper, scissors');
    })

    it('should create a context of game state and render rock, paper, scissors, lizard, spock as label', () => {
        const updatedGameContext = {
            gameState: {
                gameMode: {
                    mode: {
                        label: 'rock, paper, scissors, lizard, spock'
                    }
                }
            }
        };
        const rpslsWrapper = mount(
            <GameContext.Provider value={updatedGameContext}>
                <Headline />
            </GameContext.Provider>
        );
        expect(rpslsWrapper.find('h1').text()).toEqual('rock, paper, scissors, lizard, spock');
    })
})