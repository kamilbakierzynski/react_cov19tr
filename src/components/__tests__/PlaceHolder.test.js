import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceHolder from '../PlaceHolder';

Enzyme.configure({ adapter: new Adapter() });

describe('PlaceHolder', () => {

    it('checks if has proper width', () => {
        const props = {
            min: 10,
            max: 80,
            height: 10,
            radius: 1,
            color: "white"
        }
        const wrapper = shallow(<PlaceHolder {...props} />);
        expect(wrapper.hasClass('animation-placeholder')).toBe(true);
        expect(+wrapper.props().children.props.width.split('%')[0] > props.min).toBe(true);
        expect(+wrapper.props().children.props.width.split('%')[0] < props.max).toBe(true);

    });
})