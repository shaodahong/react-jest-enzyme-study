import React from 'react';
import ComponentProps from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

it('ComponentProps test', () => {
  const wrapper = shallow(<ComponentProps />);
  expect(wrapper).toMatchSnapshot();

  const isShow = true;

  wrapper.setProps({
    isShow
  });

  expect(wrapper.hasClass('show')).toBe(isShow);
});
