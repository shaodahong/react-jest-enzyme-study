import React from 'react';

class Text extends React.Component {
  render() {
    return <div>text</div>
  }
}

export default class Component extends React.Component {
  name = 'hello';
  render() {
    return <div>{this.name} monkey</div>;
  }
}
