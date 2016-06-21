import React from 'react';
import NavBar from '../components/NavBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <NavBar params={this.props.params}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});

export default App;
