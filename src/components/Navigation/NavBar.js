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
import {BreadCrumbContainer as BreadCrumb} from './BreadCrumb';
import {LanguageDropdownContainer as LanguageDropdown} from './LanguageDropdown';
import {getTranslator} from '../../selectors/translate';
import styles from './NavBar.scss';

const modes = ['student', 'teacher'];

function ModeDropdown(props) {
  const texts = {'student': props.t('general.student'), 'teacher': props.t('general.teacher')};
  const setMode = mode => mode === 'student' ? props.setModeStudent() : props.setModeTeacher();
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='mode-dropdown'
                    noCaret
                    pullRight
                    bsStyle={props.mode}
                    title={props.t('navbar.mode') + ': ' + texts[props.mode]}
                    onSelect={setMode}>
      {
        modes.map(k =>
          <MenuItem key={k} eventKey={k} active={props.mode === k}>{texts[k]}</MenuItem>
        )
      }
    </DropdownButton>
  </div>;
}
ModeDropdown.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  mode: PropTypes.oneOf(modes).isRequired
};

// function SearchBox(props) {
//   return <div className={styles.gadgetContainer}>
//     <FormControl type='text' placeholder={props.t('search.placeholder')}/>
//   </div>;
// }

function LkkBrand() {
  return <Navbar.Brand>
    <a href="http://kidsakoder.no" className={styles.logo}>
      <img src={require('../../assets/graphics/LKK_small.png')}/>
    </a>
  </Navbar.Brand>;
}

function LkkNav(props) {
  return <div className={styles.navContainer}>
    <Nav>
      <NavItem href="http://kidsakoder.no/om-lkk/">{props.t('navbar.lkknav.aboutlkk')}</NavItem>
      <NavItem href="http://kidsakoder.no/nyheter/">{props.t('navbar.lkknav.news')}</NavItem>
      <LinkContainer to='/'>
        <NavItem>{props.t('navbar.lkknav.lessons')}</NavItem>
      </LinkContainer>
      <NavItem href="http://kidsakoder.no/kodeklubben/kodeklubboversikt/">
        {props.t('navbar.lkknav.findcodeclub')}
      </NavItem>
      <NavItem href="http://kidsakoder.no/kodeklubben/">{props.t('navbar.lkknav.codeclub')}</NavItem>
      <NavItem href="http://kidsakoder.no/skole/">{props.t('navbar.lkknav.school')}</NavItem>
      <NavItem href="http://kidsakoder.no/kodetimen/">{props.t('navbar.lkknav.codehour')}</NavItem>
      <NavItem href="http://kidsakoder.no/bidra/">{props.t('navbar.lkknav.contribute')}</NavItem>
    </Nav>
  </div>;
}

function Gadgets(props) {
  const mode = modes[props.isStudentMode ? 0 : 1];
  // NOTE: Commenting out SearchBox until it is implemented
  return <div className={styles.gadgetGroup}>
    {<LanguageDropdown mode={mode}/>}
    <ModeDropdown setModeStudent={props.setModeStudent}
                  setModeTeacher={props.setModeTeacher}
                  mode={mode}
                  t={props.t}/>
    {/*<SearchBox t={props.t}/>*/}
  </div>;
}
Gadgets.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool
};

function MenuToggle(props) {
  return <Navbar.Toggle>
    <span className="sr-only">Toggle navigation</span>
    <span className={styles.toggleContent}>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
    </span>
    <span className={styles.toggleContent}>{props.t('navbar.menu')}</span>
  </Navbar.Toggle>;
}

export function NavBar(props) {
  const widgetClass = props.isStudentMode ? styles.widgetStudent : styles.widgetTeacher;
  return (
    <div className={styles.navbarWrapper}>
      <Navbar fluid={true} staticTop>
        <Navbar.Header>
          <LkkBrand/>
          <Clearfix visibleXsBlock/>
          <MenuToggle t={props.t}/>
        </Navbar.Header>
        <Navbar.Collapse>
          <div className={styles.spacing}/>
          <LkkNav t={props.t}/>
        </Navbar.Collapse>
        <div className={styles.widgets + ' ' + widgetClass}>
          <BreadCrumb params={props.params}/>
          <Gadgets setModeStudent={props.setModeStudent}
                   setModeTeacher={props.setModeTeacher}
                   isStudentMode={props.isStudentMode}
                   t={props.t}/>
        </div>
      </Navbar>
    </div>
  );
}
NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const NavBarContainer = connect(
  mapStateToProps,
  {
    setModeStudent,
    setModeTeacher
  }
)(withStyles(styles)(NavBar));
