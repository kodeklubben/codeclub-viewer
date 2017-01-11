import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {NavBarContainer} from '../components/Navigation/NavBar';
import {FooterContainer} from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';

const App = (props) =>
  <div className={styles.appContainer}>
    <NavBarContainer params={props.params}/>
    {props.children}
    <FooterContainer/>
  </div>;

export default withStyles(styles)(App);
