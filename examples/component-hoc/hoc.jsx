import React from 'react';

export default function Hoc(Compnent) {
  return class extends React.Component {
    state = {
      name: 'hoc'
    };
    report = () => {
      // report some date
    };
    async componentDidMount() {
      await this.report();
    }
    render() {
      return <Compnent name={this.state.name} {...this.props} />;
    }
  };
}
