import React from 'react';
import ComponentEvent from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('ComponentEvent test', () => {
  it('ComponentEvent test', () => {
    const wrapper = shallow(<ComponentEvent />);
    expect(wrapper).toMatchSnapshot();
  });

  it('ComponentEvent Button Click', () => {
    const wrapper = shallow(<ComponentEvent />);

    const onClickButtonMock = jest.spyOn(wrapper.instance(), 'onClickButton');

    wrapper.instance().forceUpdate();

    expect(onClickButtonMock).toHaveBeenCalledTimes(0);

    wrapper.find('button').prop('onClick')();

    expect(onClickButtonMock).toHaveBeenCalledTimes(1);
  });

  it('ComponentEvent Input Change', () => {
    const wrapper = shallow(<ComponentEvent />);

    wrapper.find('input').prop('onChange')({
      target: {
        value: 'mock'
      }
    });

    expect(wrapper.find('input').prop('value')).toBe('mock');
  });
});
