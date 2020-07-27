import React from 'react';
import { shallow } from '../../setupTests';
import Scoreboard from '.';

describe('<Scoreboard/>', () => {

    const initialGameState = {
        player1: {
            score: 10,
        },
        ties: 4,
        player2: {
            score: 15,
        }
    };

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Scoreboard gameState={initialGameState} />);
    });

    it('should mount Scoreboard component', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should have scoreboard section class', () => {
        expect(wrapper.find('.scoreboard-section')).toBeTruthy();
    })

    it('should render 3 li elements for diplaying players score and ties', () => {
        expect(wrapper.find('li span')).toHaveLength(3);
    })

    it('should display player 1 score as 10', () => {
        wrapper.find('li span').map((node, i) => {
            if (i === 0) {
                expect(node.text()).toEqual('10');
            }
        });
    })

    it('should display tie score as 4', () => {
        wrapper.find('li span').map((node, i) => {
            if (i === 1) {
                expect(node.text()).toEqual('4');
            }
        });
    })

    it('should display player 2 score as 15', () => {
        wrapper.find('li span').map((node, i) => {
            if (i === 2) {
                expect(node.text()).toEqual('15');
            }
        });
    })
})