import React from 'react';
import { shallow } from '../../setupTests';
import Switch from '.';

describe('<Switch/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Switch label="Toggle Button" selectedMode="true" />);
    });

    it('should mount Switch component ', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should render a checkbox for toggle button', () => {
        expect(wrapper.find("input[type='checkbox']")).toBeTruthy();
    })

    it('button name should be Toggle Button', () => {
        expect(wrapper.find(".switchBtnLabel").text()).toBeTruthy();
    })
})