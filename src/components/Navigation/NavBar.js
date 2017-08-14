import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
//import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import BreadCrumb from './BreadCrumb';
import LanguageDropdown from './LanguageDropdown';
import {getTranslator} from '../../selectors/translate';
import styles from './NavBar.scss';

const modes = ['student', 'teacher'];

const ModeDropdown = ({t, setModeStudent, setModeTeacher, mode}) => {
  const texts = {'student': t('general.student'), 'teacher': t('general.teacher')};
  const setMode = mode => mode === 'student' ? setModeStudent() : setModeTeacher();
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='mode-dropdown'
                    noCaret
                    pullRight
                    bsStyle={mode}
                    title={t('navbar.mode') + ': ' + texts[mode]}
                    onSelect={setMode}>
      {
        modes.map(k =>
          <MenuItem key={k} eventKey={k} active={mode === k}>{texts[k]}</MenuItem>
        )
      }
    </DropdownButton>
  </div>;
};

ModeDropdown.propTypes = {
  // ownProps
  mode: PropTypes.oneOf(modes).isRequired,

  //mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired
};

/*const SearchBox = ({t})  => {
  return <div className={styles.gadgetContainer}>
    <FormControl type='text' placeholder={t('search.placeholder')}/>
  </div>;
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

const Gadgets = ({isStudentMode, setModeStudent, setModeTeacher, t}) => {
  const mode = modes[isStudentMode ? 0 : 1];
  return <div className={styles.gadgetGroup}>
    {<LanguageDropdown mode={mode}/>}
    <ModeDropdown {...{setModeStudent, setModeTeacher, mode, t}}/>
    {/*<SearchBox t={t}/>*/}
  </div>;
};

Gadgets.propTypes = {
  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired,
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

export const NavBar = ({isStudentMode, t, params, setModeStudent, setModeTeacher}) => {
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
          <Gadgets {...{setModeStudent, setModeTeacher, isStudentMode, t}}/>
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

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
