import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher, setLanguage, resetFilter, setFilter} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
// import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {BreadCrumbContainer as BreadCrumb} from './BreadCrumb';

import styles from './NavBar.scss';

const languages = ['nb', 'nn', 'sv', 'da', 'en', 'hr'];
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
    },
    'en': {
      name: 'English',
      url: require('../../assets/graphics/united_kingdom.svg')
    },
    'hr': {
      name: ' Hrvatski',
      url: require('../../assets/graphics/croatia.svg')
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

const setFilterAndLanguage = (props, eventKey) => {
  props.setLanguage(eventKey);
  const filter = {};
  Object.keys(props.filter).forEach(group => {
    filter[group] = {};
    Object.keys(props.filter[group]).forEach(tag => {
      if(group === 'language' && tag === eventKey){
        filter[group][tag] = true;
      }else{
        filter[group][tag] = false;
      }
    })
  });
  props.resetFilter();
  props.setFilter(filter);
}

function LanguageDropdown(props) {
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='language-dropdown'
                    noCaret
                    pullRight
                    bsStyle={'language-' + props.mode}
                    title={<LanguageItem language={props.language}/>}
                    onSelect={(eventKey) => setFilterAndLanguage(props, eventKey)}>
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
  filter: PropTypes.object,
  mode: PropTypes.oneOf(modes).isRequired,
  language: PropTypes.oneOf(languages).isRequired,
  resetFilter: PropTypes.func,
  setFilter: PropTypes.func,
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

function Gadgets(props) {
  const mode = modes[props.isStudentMode ? 0 : 1];
  // NOTE: Commenting out LanguageDropdown and SearchBox until these are implemented
  return <div className={styles.gadgetGroup}>
    {<LanguageDropdown mode={mode} language={props.language} setFilter={props.setFilter}
      setLanguage={props.setLanguage} resetFilter={props.resetFilter} filter={props.filter}/>}
    <ModeDropdown setModeStudent={props.setModeStudent}
                  setModeTeacher={props.setModeTeacher}
                  mode={mode}/>
    {/*<SearchBox/>*/}
  </div>;
}
Gadgets.propTypes = {
  filter: PropTypes.object,
  language: PropTypes.oneOf(languages),
  setLanguage: PropTypes.func,
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool,
  setFilter: PropTypes.func,
  resetFilter: PropTypes.func
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
      </Navbar.Collapse>
      <div className={styles.widgets + ' ' + widgetClass}>
        <BreadCrumb params={props.params}/>
        <Gadgets language={props.language}
                 setLanguage={props.setLanguage}
                 setModeStudent={props.setModeStudent}
                 setModeTeacher={props.setModeTeacher}
                 isStudentMode={props.isStudentMode}
                 setFilter={props.setFilter}
                 resetFilter={props.resetFilter}
                 filter = {props.filter}/>
      </div>
    </Navbar>
  );
}
NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
  filter: PropTypes.object,
  language: PropTypes.oneOf(languages).isRequired,
  resetFilter: PropTypes.func,
  setFilter: PropTypes.func,
  setLanguage: PropTypes.func,
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    language: state.language,
    filter: state.filter
  };
}

export const NavBarContainer = connect(
  mapStateToProps,
  {
    setLanguage,
    setModeStudent,
    setModeTeacher,
    resetFilter,
    setFilter
  }
)(withStyles(styles)(NavBar));
