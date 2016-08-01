import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher, setLanguage} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import NavLink from './NavLink';
import styles from './NavBar.scss';
import ModeIndicator from './ModeIndicator';

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

    return (
      <span>
        {nativeLanguages[language].name}
        <img className={styles.flag} src={nativeLanguages[language].url}/>
      </span>
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

    return (
      <Grid fluid={true}>
        <Row>
          <Navbar className={this.props.isStudentMode ? null : 'navbar-teacher'} fluid={true} fixedTop={true}>
            <Dropdown id='language-dropdown' className='btn-language-dropdown pull-right'
              onSelect={(eventKey) => this.props.setLanguage(eventKey)}>
              <Dropdown.Toggle noCaret={true} className={this.props.isStudentMode
                ? 'btn-language-student btn-language'
                : 'btn-language-teacher btn-language'}>
                {this.getNativeLanguage(this.props.language)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey='nb'>{this.getNativeLanguage('nb')}</MenuItem>
                <MenuItem eventKey='nn'>{this.getNativeLanguage('nn')}</MenuItem>
                <MenuItem eventKey='sv'>{this.getNativeLanguage('sv')}</MenuItem>
                <MenuItem eventKey='da'>{this.getNativeLanguage('da')}</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to='/' onlyActiveOnIndex>
                  <Glyphicon glyph='home'/>
                </NavLink>
                {courseLink ? <span> / {courseLink}</span> : null}
                {lessonLink ? <span className='hidden-xs'> / {lessonLink}</span> : null}
              </Navbar.Brand>
              <Navbar.Toggle className={this.props.isStudentMode ? null : 'toggle-teacher'}/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type='text' placeholder='Søk'/>
                </FormGroup>
                {' '}
                <div className='btn-toggle'>
                  <div>Velg modus:</div>
                  <ButtonGroup className='btn-group'>
                    <Button className='btn-student-nav' active={this.props.isStudentMode}
                      onClick={() => this.props.setModeStudent()}>
                      ELEV
                    </Button>
                    <Button className="btn-teacher-nav" active={!this.props.isStudentMode}
                      onClick={() => this.props.setModeTeacher()}>
                      LÆRER
                    </Button>
                  </ButtonGroup>
                </div>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <ModeIndicator isStudentMode={this.props.isStudentMode}/>
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
