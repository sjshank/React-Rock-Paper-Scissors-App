import React from 'react';
import { shallow } from '../../setupTests';
import Weapons from '.';
import Weapon from './Weapon';

describe('<Weapons/>', () => {

    const initialGameState = {
        gameMode: {
            weaponList: ['paper', 'scissors', 'rock']
        }
    };

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Weapons gameState={initialGameState} />);
    });

    it('should mount Weapons component', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should have weapons section class', () => {
        expect(wrapper.find('.weapons-section')).toBeTruthy();
    })

    it(`should render ${initialGameState.gameMode.weaponList.length} Weapon component`, () => {
        expect(wrapper.exists(Weapon)).toBeTruthy();
        expect(wrapper.find(Weapon)).toHaveLength(initialGameState.gameMode.weaponList.length);
    })
})