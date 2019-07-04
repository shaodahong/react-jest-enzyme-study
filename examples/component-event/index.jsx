import React from 'react';

export default class ComponentEvent extends React.Component {
  state = {
    value: ''
  };

  onClickButton = e => {};

  onChangeInput = e => this.setState({ value: e.target.value });

  render() {
    return (
      <div>
        <button onClick={this.onClickButton} />
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChangeInput}
        />
      </div>
    );
  }
}
