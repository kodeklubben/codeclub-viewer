import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import Head from '../components/Head';

const container = {
  display: 'flex',
  overflowX: 'hidden',
  minHeight: '100vh',
  flexDirection: 'column',
};

const styles = {
  appContainer: {
    ...container,
    fontFamily: 'Roboto',
  },
  appContainerDyslexia: {
    ...container,
    fontFamily: 'sans-serif',
  },
  stickyFooter: {
    flex: 1,
  },
};

const App = ({classes, params, location, children, showDyslexicFont}) => {
  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  const className = showDyslexicFont ? classes.appContainerDyslexia : classes.appContainer;
  return (
    <div {...{className}}>
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

  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(App));
