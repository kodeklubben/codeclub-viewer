import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';

import {getTranslator} from '../selectors/translate';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';

const App = ({params, location, children, t, showDyslexicFont}) => {
  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  const className = showDyslexicFont ? styles.dyslexia : styles.appContainer;
  return <DocumentTitle title={t('title.codeclub')}>
    <div {...{className}}>
      {renderPdf ? <PdfHeader course={params.course}/> : <NavBar {...{params}}/>}
      {children}
      {renderPdf ? null : <Footer/>}
    </div>
  </DocumentTitle>;
};

App.propTypes = {
  // ownProps
  params: PropTypes.object,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.object,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(App));
