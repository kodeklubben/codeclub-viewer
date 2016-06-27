import React from 'react';

import Title from '../components/Title';
import NavBar from '../components/NavBar';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBar params={this.props.params}/>
        <Title />
        {this.props.children}
      </div>
    );
  }

});

export default App;
