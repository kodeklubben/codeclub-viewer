import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, Toolbar} from '@material-ui/core';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import OpenDyslexic from '../assets/fonts/OpenDyslexic-Regular.ttf';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';

const darkTheme= {
  palette: {
    type: 'dark',
    primary: {
      main: grey[50],
    },
    secondary: {
      main: grey[800],
    }
  },
  typography: {
    fontSize: 16,
  },
};

const lightTheme= {
  palette: {
    type: 'light',
    primary: {
      main: grey[900],
    },
    secondary: {
      main: lightGreen[100],
    },
  },
  typography: {
    fontSize: 16,
  },
};

const dyslexicTheme = createMuiTheme({
  ...lightTheme,
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
  ...darkTheme,
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
  ...darkTheme,
});

const defaultTheme = createMuiTheme({
  ...lightTheme,
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
