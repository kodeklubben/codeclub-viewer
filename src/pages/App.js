import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';

import {getTranslator} from '../selectors/translate';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';

const App = ({t, params, children}) => {
  return <DocumentTitle title={t('title.codeclub')}>
    <div className={styles.appContainer}>
      <NavBar {...{params}}/>
      {children}
      <Footer/>
    </div>
  </DocumentTitle>;
};

App.propTypes = {
  // ownProps
  params: PropTypes.object,
  children: PropTypes.object,

  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(App));
