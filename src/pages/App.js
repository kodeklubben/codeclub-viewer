import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, Toolbar} from '@material-ui/core';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import PdfHeader from '../components/PdfHeader';
import OpenDyslexic from '../assets/fonts/OpenDyslexic-Regular.ttf';

const dyslexicTheme = createMuiTheme({
  typography: {
    fontFamily: ['OpenDyslexic', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': {
          fontFamily: 'OpenDyslexic',
          src: `url(${OpenDyslexic})`,
        },
      },
    },
  },
});

const darkDyslexicTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: ['OpenDyslexic', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': {
          fontFamily: 'OpenDyslexic',
          src: `url(${OpenDyslexic})`,
        },
      },
    },
  },
});

const darkModeTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const useStyles = makeStyles(theme => ({
  footer: {
    minHeight: '100vh',
    flexDirection: 'column',
  },
}));

const App = ({params, location, children}) => {
  const classes = useStyles();

  const showDyslexicFont = useSelector(state => state.showDyslexicFont);
  const showDarkMode = useSelector(state => state.showDarkMode);

  let theme = defaultTheme;
  if (showDyslexicFont && !showDarkMode) { theme = dyslexicTheme; }
  if (!showDyslexicFont && showDarkMode) { theme = darkModeTheme; }
  if (showDyslexicFont && showDarkMode) { theme = darkDyslexicTheme; }

  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  return (
    <ThemeProvider {...{theme}}>
      <CssBaseline/>
      <Head/>
      {renderPdf ? <PdfHeader course={params.course}/> : <NavBar {...{params}}/>}
      {renderPdf ? null : <Toolbar/>}
      <div className={classes.footer}>{children}</div>
      {renderPdf ? null : <Footer/>}
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
