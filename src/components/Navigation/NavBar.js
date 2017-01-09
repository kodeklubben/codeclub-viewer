import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher, setLanguage} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
// import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import NavLink from './NavLink';
import styles from './NavBar.scss';

const languages = ['nb', 'nn', 'sv', 'da'];
const modes = ['student', 'teacher'];

function LanguageItem(props) {
  const nativeLanguages = {
    'nb': {
      name: 'Norsk bokmål',
      url: require('../../assets/graphics/norway.svg')
    },
    'nn': {
      name: 'Norsk nynorsk',
      url: require('../../assets/graphics/norway.svg')
    },
    'sv': {
      name: 'Svenska',
      url: require('../../assets/graphics/sweden.svg')
    },
    'da': {
      name: 'Dansk',
      url: require('../../assets/graphics/denmark.svg')
    }
  };
  // Note that the block with "float" (the flag) must be first in the containing div
  return (
    <div>
      <img className={styles.flag} src={nativeLanguages[props.language].url}/>
      <div className={styles.language}>{nativeLanguages[props.language].name}</div>
    </div>
  );
}
LanguageItem.propTypes = {
  language: PropTypes.oneOf(languages).isRequired
};

function LanguageDropdown(props) {
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='language-dropdown'
                    noCaret
                    pullRight
                    bsStyle={'language-' + props.mode}
                    title={<LanguageItem language={props.language}/>}
                    onSelect={(eventKey) => props.setLanguage(eventKey)}>
      {
        languages.map(k =>
          <MenuItem key={k} eventKey={k} active={props.language === k}>
            <LanguageItem language={k}/>
          </MenuItem>
        )
      }
    </DropdownButton>
  </div>;
}
LanguageDropdown.propTypes = {
  mode: PropTypes.oneOf(modes).isRequired,
  language: PropTypes.oneOf(languages).isRequired,
  setLanguage: PropTypes.func.isRequired
};

function ModeDropdown(props) {
  const texts = {'student': 'ELEV', 'teacher': 'LÆRER'};
  const setMode = mode => mode === 'student' ? props.setModeStudent() : props.setModeTeacher();
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='mode-dropdown'
                    noCaret
                    pullRight
                    bsStyle={props.mode}
                    title={'Modus: ' + texts[props.mode]}
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

// function SearchBox() {
//   return <div className={styles.gadgetContainer}>
//     <FormControl type='text' placeholder='Søk'/>
//   </div>;
// }

function LkkBrand() {
  return <Navbar.Brand>
    <a href="http://kidsakoder.no" className={styles.logo}>
      <img src={require('../../assets/graphics/LKK_small.png')}/>
    </a>
  </Navbar.Brand>;
}

function LkkNav() {
  return <div className={styles.navContainer}>
    <Nav>
      <NavItem href="http://kidsakoder.no/om-lkk/">Om LKK</NavItem>
      <NavItem href="http://kidsakoder.no/nyheter/">Nyheter</NavItem>
      <LinkContainer to='/'>
        <NavItem>Oppgaver</NavItem>
      </LinkContainer>
      <NavItem href="http://kidsakoder.no/kodeklubben/kodeklubboversikt/">Finn kodeklubb</NavItem>
      <NavItem href="http://kidsakoder.no/kodeklubben/">Kodeklubben</NavItem>
      <NavItem href="http://kidsakoder.no/skole/">Skole</NavItem>
      <NavItem href="http://kidsakoder.no/kodetimen/">Kodetimen</NavItem>
      <NavItem href="http://kidsakoder.no/bidra/">Bidra?</NavItem>
    </Nav>
  </div>;
}

function BreadCrumb(props) {
  const params = props.params;
  const courseLink = params.course ?
    <NavLink to={`/${params.course}`}>
      {params.course}
    </NavLink> : null;
  const lessonLink = params.course && params.lesson && params.file ?
    <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>
      {(params.lesson).replace(/_/g, ' ')}
    </NavLink> : null;
  return <div className={styles.breadcrumb}>
    <NavLink to='/' onlyActiveOnIndex>
      <Glyphicon glyph='home'/>
    </NavLink>
    {courseLink ? <span> / {courseLink}</span> : null}
    {lessonLink ? <span> / {lessonLink}</span> : null}
  </div>;
}
BreadCrumb.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

function Gadgets(props) {
  const mode = modes[props.isStudentMode ? 0 : 1];
  // NOTE: Commenting out LanguageDropdown and SearchBox until these are implemented
  return <div className={styles.gadgetGroup}>
    {/*<LanguageDropdown mode={mode} language={props.language} setLanguage={props.setLanguage}/>*/}
    <ModeDropdown setModeStudent={props.setModeStudent}
                  setModeTeacher={props.setModeTeacher}
                  mode={mode}/>
    {/*<SearchBox/>*/}
  </div>;
}
Gadgets.propTypes = {
  language: PropTypes.oneOf(languages),
  setLanguage: PropTypes.func,
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool
};

function MenuToggle() {
  return <Navbar.Toggle>
    <span className="sr-only">Toggle navigation</span>
    <span className={styles.toggleContent}>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
    </span>
    <span className={styles.toggleContent}>Meny</span>
  </Navbar.Toggle>;
}

export function NavBar(props) {
  // Øverst: Den samme logoen og navlinks som ellers på kidsakoder.no, og i samme farge (grått)
  // Under denne: Menylinjen slik den var før jeg begynte med kidsakoder-navbaren.
  // I mobile mode: Vis menylinje-objektene nederst under navitems, navitems stacked "som vanlig";
  //                Hvis mulig, la logoen bli sentrert i navbar, og flytt knappen ned under kidsakoder-navitems
  //                slik at det ser mest mulig likt ut.
  // Dessuten: Se hvordan det blir dersom vi bytter ut kurs-navn i breadcrumb med logoen. Og til slutt,
  //           deaktiver språk og søk.
  const widgetClass = props.isStudentMode ? styles.widgetStudent : styles.widgetTeacher;
  return (
    <Navbar fluid={true} staticTop>
      <Navbar.Header>
        <LkkBrand/>
        <Clearfix visibleXsBlock/>
        <MenuToggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <div className={styles.spacing}/>
        <LkkNav/>
        <div className={styles.widgets + ' ' + widgetClass}>
          <BreadCrumb params={props.params}/>
          <Gadgets language={props.language}
                   setLanguage={props.setLanguage}
                   setModeStudent={props.setModeStudent}
                   setModeTeacher={props.setModeTeacher}
                   isStudentMode={props.isStudentMode}/>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
  language: PropTypes.oneOf(languages).isRequired,
  setLanguage: PropTypes.func,
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    language: state.language
  };
}

export const NavBarContainer = connect(
  mapStateToProps,
  {
    setLanguage,
    setModeStudent,
    setModeTeacher
  }
)(withStyles(styles)(NavBar));
