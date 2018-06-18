import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getTranslator} from '../selectors/translate';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';
import Head from '../components/Head';

const App = ({t, params, location, children}) => {
  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  return (
    <div>
      <Head title={t('head.title')} description={t('head.description')}/>
      <div className={styles.appContainer}>
        {renderPdf ? <PdfHeader {...{params}}/> : <NavBar {...{params}}/>}
        {children}
        {renderPdf ? null : <Footer/>}
      </div>
    </div>
  );
};

App.propTypes = {
  // ownProps
  params: PropTypes.object,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
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
