import React from 'react';

export default class ComponentProps extends React.Component {
  render() {
    return this.props.isShow ? (
      <div className="show">show</div>
    ) : (
      <div className="hide">hide</div>
    );
  }
}
