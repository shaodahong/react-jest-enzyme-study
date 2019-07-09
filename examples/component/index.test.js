import React from 'react';
import Component from './index';
import Enzyme, { shallow, render, mount } from 'enzyme';


it('Component test', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot()
});
