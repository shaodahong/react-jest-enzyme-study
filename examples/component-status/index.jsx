import React from 'react';

export default class ComponentStatus extends React.Component {
  state = {
    name: 'hello'
  };
  handler = () => {
    const { ext = '' } = this.props;
    if (!ext) {
      return this.state.name;
    }
    return this.state.name + ' ' + ext;
  };
  render() {
    return <div>{this.handler()}</div>;
  }
}
