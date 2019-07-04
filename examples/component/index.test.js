import React from 'react';
import Component from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

it('Component test', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});
