import React from 'react';
import {NavBarContainer} from '../components/Navigation/NavBar';
import {FooterContainer} from '../components/Navigation/Footer';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBarContainer params={this.props.params}/>
        {this.props.children}
        <FooterContainer/>
      </div>
    );
  }

});

export default App;
