import React from 'react';
import { shallow } from '../../setupTests';
import Player from '.';

describe('<Player/>', () => {
    const player = { weapon: 'paper' };
    const wrapper = shallow(<Player label="John Smith" player={player} />);

    it('should mount Player component', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should render player name as John Smith and display paper icon', () => {
        expect(wrapper.find('h6').text()).toEqual('John Smith');
        expect(wrapper.find('.fa').hasClass('fa-hand-paper-o')).toBeTruthy();
    })
})