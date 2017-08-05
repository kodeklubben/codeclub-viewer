import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
//import FormControl from 'react-bootstrap/lib/FormControl';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {BreadCrumbContainer as BreadCrumb} from './BreadCrumb';
import LanguageDropdown from './LanguageDropdown';
import {getTranslator} from '../../selectors/translate';
import styles from './NavBar.scss';
import ModeButton from './ModeButton';

const modes = ['student', 'teacher'];

// function SearchBox(props) {
//   return <div className={styles.gadgetContainer}>
//     <FormControl type='text' placeholder={props.t('search.placeholder')}/>
//   </div>;
// }

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
  t: PropTypes.func
};

const Gadgets = ({isStudentMode, t}) => {
  const mode = modes[isStudentMode ? 0 : 1];
  return <div className={styles.gadgetGroup}>
    {<LanguageDropdown mode={mode}/>}
    <ModeButton mode={mode} t={t}/>
    {/*<SearchBox t={t}/>*/}
  </div>;
};

Gadgets.propTypes = {
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
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
  t: PropTypes.func
};

export const NavBar = ({isStudentMode, t, params}) => {
  const widgetClass = isStudentMode ? styles.widgetStudent : styles.widgetTeacher;
  return (
    <div className={styles.navbarWrapper}>
      <Navbar fluid={true} staticTop>
        <Navbar.Header>
          <LkkBrand/>
          <Clearfix visibleXsBlock/>
          <MenuToggle t={t}/>
        </Navbar.Header>
        <Navbar.Collapse>
          <div className={styles.spacing}/>
          <LkkNav t={t}/>
        </Navbar.Collapse>
        <div className={styles.widgets + ' ' + widgetClass}>
          <BreadCrumb params={params}/>
          <Gadgets isStudentMode={isStudentMode} t={t}/>
        </div>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

export const NavBarContainer = connect(
  mapStateToProps
)(withStyles(styles)(NavBar));
