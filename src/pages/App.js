import React from 'react';
import {NavBarContainer} from '../components/Navigation/NavBar';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBarContainer params={this.props.params}/>
        {this.props.children}
      </div>
    );
  }

});

export default App;
