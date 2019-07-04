import React from 'react';

export default class ComponentState extends React.Component {
  state = {
    text: ''
  };
  render() {
    return <div>{this.state.text}</div>;
  }
}
