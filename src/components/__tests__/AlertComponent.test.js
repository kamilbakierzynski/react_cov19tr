import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlertComponent from '../AlertComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Alert Component', () => {

    it('renders alert if needed', () => {

        const wrapperTrue = shallow(<AlertComponent alertOptions={{ show: true }} />);
        expect(wrapperTrue.is('#alert')).toBe(true)

        const wrapperFalse = shallow(<AlertComponent alertOptions={{ show: false }} />);
        expect(wrapperFalse.is('#alert')).toBe(false)
    });

    it('renders proper title and body', () => {

        const alertOptions = {
            show: true,
            title: 'Test proper title',
            body: 'Test proper body'
        }

        const wrapper = shallow(<AlertComponent alertOptions={alertOptions} />);
        expect(wrapper.find('#heading').text()).toEqual(alertOptions.title);
        expect(wrapper.find('#body').text()).toEqual(alertOptions.body);

    });
})