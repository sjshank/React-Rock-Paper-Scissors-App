import React from 'react';
import { shallow } from '../../setupTests';
import Button from '.';

describe('<Button/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Button label="Button" disabled="false" />);
    });

    it('should mount Button component', () => {
        expect(wrapper).not.toBeNull();
    })

    it('button name should be Button', () => {
        expect(wrapper.exists('button')).toBeTruthy();
        expect(wrapper.contains(<span className='paddingLeft-x_small'>Button</span>)).toBeTruthy();
    })
})