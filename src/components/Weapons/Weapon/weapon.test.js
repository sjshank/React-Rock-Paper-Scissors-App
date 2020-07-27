import React from 'react';
import { shallow } from '../../../setupTests';
import Weapon from '.';

describe('<Weapon/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Weapon weapon='scissors' />);
    });

    it('should mount Weapon component ', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should render weapon box for displaying weapon', () => {
        expect(wrapper.find('.weapon-box')).toBeTruthy();
    })

    it(`should render scissor weapon icon`, () => {
        expect(wrapper.exists('i')).toBeTruthy();
        expect(wrapper.find('fa-hand-scissors-o')).toBeTruthy();
    })
})