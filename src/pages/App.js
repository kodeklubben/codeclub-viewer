import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import Head from '../components/Head';

const styles = {
  appContainer: {
    display: 'flex',
    overflowX: 'hidden',
    minHeight: '100vh',
    flexDirection: 'column',
    margin: -8,
  },
  stickyFooter: {
    flex: 1,
  },
};

const App = ({classes, params, location, children}) => {
  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  return (
    <div className={classes.appContainer}>
      <Head/>
      {renderPdf ? <PdfHeader  {...{params}}/> : <NavBar {...{params}}/>}
      <div className={classes.stickyFooter}>{children}</div>
      {renderPdf ? null : <Footer/>}
    </div>
  );
};

App.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.object,
};

export default (withStyles(styles)(App));
