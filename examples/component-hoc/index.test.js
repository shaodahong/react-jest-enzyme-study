import React from 'react';
import ComponentHoc from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('ComponentHoc test', () => {
  it('ComponentHoc test', () => {
    const wrapper = mount(shallow(<ComponentHoc />).get(0));

    expect(wrapper).toMatchSnapshot();
  });
});
