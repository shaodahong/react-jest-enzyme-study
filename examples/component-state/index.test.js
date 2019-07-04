import React from 'react';
import ComponentState from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

it('ComponentState test', () => {
  const wrapper = shallow(<ComponentState />);
  expect(wrapper).toMatchSnapshot();

  const text = 'hello monkey';
  wrapper.setState({ text });
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.text()).toBe(text);
});
