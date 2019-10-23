import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';
import Head from '../components/Head';

const App = ({params, location, children}) => {
  useStyles(styles);

  const showDyslexicFont = useSelector(state => state.showDyslexicFont);

  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = Object.keys(location.query).includes('pdf');
  const className = showDyslexicFont ? styles.appContainerDyslexia : styles.appContainer;
  return (
    <div>
      <Head/>
      <div {...{className}}>
        {renderPdf ? <PdfHeader course={params.course}/> : <NavBar {...{params}}/>}
        <div className={styles.stickyFooter}>{children}</div>
        {renderPdf ? null : <Footer/>}
      </div>
    </div>
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
