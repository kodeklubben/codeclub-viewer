import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {NavBarContainer} from '../components/Navigation/NavBar';

import styles from './App.scss';

const App = React.createClass({

  render() {
    return (
      <div className={styles.container}>
        <NavBarContainer params={this.props.params}/>
        {this.props.children}
      </div>
    );
  }

});

export default withStyles(styles)(App);
