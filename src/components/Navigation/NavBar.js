import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NavBar.scss';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
//import FormControl from 'react-bootstrap/lib/FormControl';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {getTranslator} from '../../selectors/translate';
import BreadCrumb from './BreadCrumb';
import LanguageDropdown from './LanguageDropdown';
import ModeDropdown from './ModeDropdown';

/*const SearchBox = ({t})  => {
  return <FormControl type='text' placeholder={t('search.placeholder')}/>
};

SearchBox.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired
};*/

const LkkBrand = () => {
  return <Navbar.Brand>
    <a href="http://kidsakoder.no" className={styles.logo}>
      <img src={require('../../assets/graphics/LKK_small.png')}/>
    </a>
  </Navbar.Brand>;
};

const LkkNav = ({t}) => {
  return <div className={styles.navContainer}>
    <Nav>
      <NavItem href="http://kidsakoder.no/om-lkk/">{t('navbar.lkknav.aboutlkk')}</NavItem>
      <NavItem href="http://kidsakoder.no/nyheter/">{t('navbar.lkknav.news')}</NavItem>
      <LinkContainer to='/'>
        <NavItem>{t('navbar.lkknav.lessons')}</NavItem>
      </LinkContainer>
      <NavItem href="http://kidsakoder.no/kodeklubben/kodeklubboversikt/">
        {t('navbar.lkknav.findcodeclub')}
      </NavItem>
      <NavItem href="http://kidsakoder.no/kodeklubben/">{t('navbar.lkknav.codeclub')}</NavItem>
      <NavItem href="http://kidsakoder.no/skole/">{t('navbar.lkknav.school')}</NavItem>
      <NavItem href="http://kidsakoder.no/kodetimen/">{t('navbar.lkknav.codehour')}</NavItem>
      <NavItem href="http://kidsakoder.no/bidra/">{t('navbar.lkknav.contribute')}</NavItem>
    </Nav>
  </div>;
};

LkkNav.propTypes = {
  //mapStateToProps
  t: PropTypes.func.isRequired
};

const MenuToggle = ({t}) => {
  return <Navbar.Toggle>
    <span className="sr-only">Toggle navigation</span>
    <span className={styles.toggleContent}>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
    </span>
    <span className={styles.toggleContent}>{t('navbar.menu')}</span>
  </Navbar.Toggle>;
};

MenuToggle.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired
};

const NavBar = ({isStudentMode, t, params}) => {
  const widgetClass = isStudentMode ? styles.widgetStudent : styles.widgetTeacher;
  return (
    <div className={styles.navbarWrapper}>
      <Navbar fluid={true} staticTop>
        <Navbar.Header>
          <LkkBrand/>
          <Clearfix visibleXsBlock/>
          <MenuToggle {...{t}}/>
        </Navbar.Header>
        <Navbar.Collapse>
          <div className={styles.spacing}/>
          <LkkNav {...{t}}/>
        </Navbar.Collapse>
        <div className={styles.widgets + ' ' + widgetClass}>
          <BreadCrumb {...params}/>
          <div className={styles.gadgetGroup}>
            <LanguageDropdown/>
            <ModeDropdown/>
            {/*<SearchBox {...{t}}/>*/}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(NavBar));
