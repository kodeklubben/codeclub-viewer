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

export const NavBar = React.createClass({

  getNativeLanguage(language) {
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
        <img className={styles.flag} src={nativeLanguages[language].url}/>
        <div className={styles.language}>{nativeLanguages[language].name}</div>
      </div>
    );
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ?
      <NavLink to={`/${params.course}`}>
        {params.course}
      </NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>
        {(params.lesson).replace(/_/g, ' ')}
      </NavLink> : null;
    const modes = ['student', 'teacher'];
    const mode = modes[this.props.isStudentMode ? 0 : 1];
    const texts = {'student': 'ELEV', 'teacher': 'LÆRER'};
    const setMode = mode => mode === 'student' ? this.props.setModeStudent() : this.props.setModeTeacher();
    const languages = ['nb', 'nn', 'sv', 'da'];
    const language = this.props.language;
    const languageDropdown = (
      <DropdownButton id='language-dropdown'
                      noCaret
                      bsStyle={'language-' + mode}
                      title={this.getNativeLanguage(language)}
                      onSelect={(eventKey) => this.props.setLanguage(eventKey)}>
        {
          languages.map(k =>
            <MenuItem key={k} eventKey={k} active={language === k}>{this.getNativeLanguage(k)}</MenuItem>
          )
        }
      </DropdownButton>
    );
    const modeDropdown = (
      <DropdownButton id='mode-dropdown'
                      noCaret
                      bsStyle={mode}
                      title={'Modus: ' + texts[mode]}
                      onSelect={setMode}>
        {
          modes.map(k =>
            <MenuItem key={k} eventKey={k} active={mode === k}>{texts[k]}</MenuItem>
          )
        }
      </DropdownButton>
    );
    const searchBox = (
      <FormControl type='text' placeholder='Søk'/>
    );
    return (
      <Grid fluid={true}>
        <Row>
          <Navbar className={this.props.isStudentMode ? null : 'navbar-teacher'} fluid={true} fixedTop={true}>
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
                <div className={styles.gadgetContainer}>
                  {languageDropdown}
                </div>
                <div className={styles.gadgetContainer}>
                  {modeDropdown}
                </div>
                <div className={styles.gadgetContainer}>
                  {searchBox}
                </div>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Grid>
    );
  }

});

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
