import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';

const theme = createMuiTheme({
  '@font-face': [
    {
      fontFamily: 'Roboto',
      src: 'url("../assets/fonts/Roboto-Regular.ttf") format("truetype")',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
    {
      fontFamily: 'Roboto',
      src: 'url("../assets/fonts/Roboto-Light.ttf") format("truetype")',
      fontWeight: 100,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
    {
      fontFamily: 'Roboto',
      src: 'url("../assets/fonts/Roboto-Medium.ttf") format("truetype")',
      fontWeight: 300,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    }
  ],
});

const App = ({params, location, children}) => {

  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  return (
    <ThemeProvider {...{theme}}>
      <CssBaseline/>
      <Head/>
      {renderPdf ? null : <NavBar {...{params}}/>}
      {children}
    </ThemeProvider>
  );
};

App.propTypes = {
  params: PropTypes.object,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.object,
};

export default App;
