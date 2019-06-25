import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';
import Head from '../components/Head';

const App = ({params, location, children, showDyslexicFont, showDarkMode}) => {
  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  const appStyle = {
    dyslexia: showDyslexicFont ? styles.dyslexia : '',
    darkmode: showDarkMode ? styles.darkmode : '',
  };
  const className = styles.appContainer + ' ' + appStyle.dyslexia + ' ' + appStyle.darkmode;
  return (
    <div>
      <Head/>
      <div {...{className}}>
        {renderPdf ? <PdfHeader  {...{params}}/> : <NavBar {...{params}}/>}
        <div className={styles.stickyFooter}>{children}</div>
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
  showDyslexicFont: PropTypes.bool.isRequired,
  showDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
  showDarkMode: state.showDarkMode,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(App));
