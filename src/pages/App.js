import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, Toolbar} from '@material-ui/core';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
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
  hide: {
    '@media print': {
      display: 'none',
    },
  },
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

  return (
    <ThemeProvider {...{theme}}>
      <CssBaseline/>
      <Head/>
      <NavBar className={classes.hide} {...{params}}/>
      <Toolbar className={classes.hide}/>
      <div className={classes.footer}>{children}</div>
      <Footer className={classes.hide}/>
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
