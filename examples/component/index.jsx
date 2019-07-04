import React from 'react';

export default class Component extends React.Component {
  name = 'hello';
  render() {
    return <div>{this.name} world</div>;
  }
}
