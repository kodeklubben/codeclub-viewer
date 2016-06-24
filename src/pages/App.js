import React from 'react';

import NavBar from '../components/NavBar';
import FrontPageButton from '../components/FrontPageButton';
import Title from '../components/Title';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBar params={this.props.params} />
        <Title />
        {this.props.children}
      </div>
    );
  }

});

export default App;
