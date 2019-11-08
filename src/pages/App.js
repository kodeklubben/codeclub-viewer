import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, Toolbar} from '@material-ui/core';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import OpenDyslexic from '../assets/fonts/OpenDyslexic-Regular.ttf';

const openDyslexic = {
  fontFamily: 'OpenDyslexic',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${OpenDyslexic})`,
};

const dyslexicTheme = createMuiTheme({
  typography: {
    fontFamily: ['OpenDyslexic', 'Helvetica', 'Arial', 'sans-serif'],
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [openDyslexic],
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
  if (showDarkMode && !showDyslexicFont) { theme = darkModeTheme; }
  if (showDyslexicFont && !showDarkMode) { theme = dyslexicTheme; }
  if (showDyslexicFont && showDarkMode) { theme = {...darkModeTheme, ...dyslexicTheme}; }

  console.log(theme);

  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  return (
    <ThemeProvider {...{theme}}>
      <CssBaseline/>
      <Head/>
      {renderPdf ? null : <NavBar {...{params}}/>}
      <Toolbar/>
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
