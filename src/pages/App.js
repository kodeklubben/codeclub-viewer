import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import Head from '../components/Head';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import RefreshButton from '../components/RefreshButton';
import OpenDyslexic from '../assets/fonts/OpenDyslexic-Regular.ttf';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';

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

const App = ({params, children}) => {
  const classes = useStyles();

  const [refreshStatus, setRefreshStatus] = React.useState(false);

  const showDyslexicFont = useSelector(state => state.showDyslexicFont);
  const showDarkMode = useSelector(state => state.showDarkMode);

  let theme = createMuiTheme({
    overrides: showDyslexicFont ? {
      MuiCssBaseline: {
        '@global': {
          '@font-face': {
            fontFamily: 'OpenDyslexic',
            src: `url(${OpenDyslexic})`,
          },
        },
      },
    } : {},
    palette: {
      type: showDarkMode ? 'dark' : 'light',
      background: {
        default: showDarkMode ? grey[900] : grey[50],
      },
      primary: {
        main: showDarkMode ? grey[50] : grey[900],
      },
      secondary: {
        main: showDarkMode ? grey[800] : lightGreen[100],
      }
    },
    typography: {
      fontSize: 16,
      fontFamily: showDyslexicFont ?
        ['OpenDyslexic', 'Helvetica', 'Arial', 'sans-serif'].join(',')
        :
        ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
  });

  React.useEffect(() => {
    registerEvents(runtime.register(), {onUpdateReady: () => setRefreshStatus(true)});
  }, []);
 
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline/>
      <Head/>
      <NavBar className={classes.hide} {...{params}}/>
      {refreshStatus ? <RefreshButton open={refreshStatus}/> : null}
      <div className={classes.footer}>{children}</div>
      <Footer className={classes.hide}/>
    </ThemeProvider>
  );
};

App.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
};

export default App;
