import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';
import Title from '../components/Title';

const App = React.createClass({

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(null, {userAgent: 'all'})}>
        <div>
          <NavBar params={this.props.params}/>
          <Title />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }

});

export default App;
