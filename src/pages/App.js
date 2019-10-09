import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, useLocation} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import PdfHeader from '../components/PdfHeader';
import NavBar from '../components/Navigation/NavBar';
import Footer from '../components/Navigation/Footer';
import styles from './App.scss';
import '../styles/customBootstrapStyles';
import Head from '../components/Head';
import FrontPage from './FrontPage';
import CoursePage from './CoursePage';
import LessonPage from './LessonPage';
import PageNotFound from './PageNotFound';

const App = ({showDyslexicFont}) => {
  useStyles(styles);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page on every transition
  }, []);

  // renderPdf is true if 'pdf' is a query-param, regardless of value, e.g. "...?pdf" or "...?a=1&pdf=0"
  const renderPdf = useLocation().search.includes('pdf');
  const className = showDyslexicFont ? styles.appContainerDyslexia : styles.appContainer;
  return (
    <div>
      <Head/>
      <div {...{className}}>
        {renderPdf ? <PdfHeader/> : <NavBar/>}
        <div className={styles.stickyFooter}>
          <Switch>
            <Route exact path='/' component={FrontPage}/>
            <Route path='/:course' component={CoursePage}/>
            <Route path='/:course/:lesson/:file' component={LessonPage}/>
            <Route path='*' component={PageNotFound}/>
          </Switch>
        </div>
        {renderPdf ? null : <Footer/>}
      </div>
    </div>
  );
};

App.propTypes = {
  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(mapStateToProps)(App);
