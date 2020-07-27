// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as AppConstants from './config/appConstant';

configure({ adapter: new Adapter() });


export { shallow, render, mount };