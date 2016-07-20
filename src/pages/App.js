import React from 'react';
import {NavBarContainer} from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';

const App = React.createClass({

  render() {
    return (
      <div>
        <NavBarContainer params={this.props.params}/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }

});

export default App;
