import React from 'react';
import Hoc from './hoc';

class ComponentHoc extends React.Component {
  render() {
    return <div>hello world {this.props.name}</div>;
  }
}

export default Hoc(ComponentHoc);
