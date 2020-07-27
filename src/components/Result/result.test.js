import React from 'react';
import { shallow } from '../../setupTests';
import * as AppConstants from "../../config/appConstant";
import Result from '.';

describe('<Result/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Result />);
    });

    it('should mount Result component using context', () => {
        expect(wrapper).not.toBeNull();
    })

    it('should render result text from AppConstants.INFO_LABEL', () => {
        wrapper.setProps({
            'resultText': AppConstants.INFO_LABEL,
            'gameMode': 'verses'
        });
        expect(wrapper.text()).toEqual(AppConstants.INFO_LABEL);
    })

    it('should render empty result text', () => {
        expect(wrapper.find('h6').text()).not.toBe(AppConstants.INFO_LABEL);
    })
})