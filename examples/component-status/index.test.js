import React from 'react';
import ComponentState from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('ComponentStatus test', () => {
  it('ComponentStatus snap', () => {
    const wrapper = shallow(<ComponentState />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('ComponentStatus props', () => {
    const wrapper = shallow(<ComponentState ext="shanghai" />);
  
    expect(wrapper.text()).toBe('hello shanghai');
  });
});
