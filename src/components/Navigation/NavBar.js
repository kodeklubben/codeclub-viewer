import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher, setLanguage} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

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
  return <DropdownButton id='language-dropdown'
                         noCaret
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
  </DropdownButton>;
}
LanguageDropdown.propTypes = {
  mode: PropTypes.oneOf(modes).isRequired,
  language: PropTypes.oneOf(languages).isRequired,
  setLanguage: PropTypes.func.isRequired
};

function ModeDropdown(props) {
  const texts = {'student': 'ELEV', 'teacher': 'LÆRER'};
  const setMode = mode => mode === 'student' ? props.setModeStudent() : props.setModeTeacher();
  return <DropdownButton id='mode-dropdown'
                         noCaret
                         bsStyle={props.mode}
                         title={'Modus: ' + texts[props.mode]}
                         onSelect={setMode}>
    {
      modes.map(k =>
        <MenuItem key={k} eventKey={k} active={props.mode === k}>{texts[k]}</MenuItem>
      )
    }
  </DropdownButton>;
}
ModeDropdown.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  mode: PropTypes.oneOf(modes).isRequired
};

function SearchBox() {
  return <FormControl type='text' placeholder='Søk'/>;
}

export function NavBar(props) {
  const params = props.params;
  const courseLink = params.course ?
    <NavLink to={`/${params.course}`}>
      {params.course}
    </NavLink> : null;
  const lessonLink = params.course && params.lesson && params.file ?
    <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>
      {(params.lesson).replace(/_/g, ' ')}
    </NavLink> : null;
  const mode = modes[props.isStudentMode ? 0 : 1];
  return (
    <Grid fluid={true}>
      <Row>
        <Navbar className={props.isStudentMode ? null : 'navbar-teacher'} fluid={true} fixedTop={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to='/' onlyActiveOnIndex>
                <Glyphicon glyph='home'/>
              </NavLink>
              {courseLink ? <span> / {courseLink}</span> : null}
              {lessonLink ? <span className='hidden-xs'> / {lessonLink}</span> : null}
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <div className={styles.gadgetGroup}>
              {/* Hide languages until implemented
              <div className={styles.gadgetContainer}>
                <LanguageDropdown mode={mode} language={props.language} setLanguage={props.setLanguage}/>
              </div>
               */}
              <div className={styles.gadgetContainer}>
                <ModeDropdown setModeStudent={props.setModeStudent}
                              setModeTeacher={props.setModeTeacher}
                              mode={mode}/>
              </div>
              {/* Hide search until it is implemented
              <div className={styles.gadgetContainer}>
                <SearchBox/>
              </div>
               */}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Grid>
  );
}
NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
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
