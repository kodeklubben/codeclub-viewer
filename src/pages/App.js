import React from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';

import {getTranslator} from '../selectors/translate';
import {NavBarContainer} from '../components/Navigation/NavBar';
import {FooterContainer} from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';

const App = ({t, params, children}) =>
  <DocumentTitle title={t('title.codeclub')}>
    <div className={styles.appContainer}>
      <NavBarContainer params={params}/>
      {children}
      <FooterContainer/>
    </div>
  </DocumentTitle>;

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(App));
