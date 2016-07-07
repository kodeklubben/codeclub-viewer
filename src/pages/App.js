import React from 'react';
import NavBar from '../components/Navigation/NavBar';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBar params={this.props.params}/>
        {this.props.children}
      </div>
    );
  }

});

export default App;
