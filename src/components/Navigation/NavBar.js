import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setModeStudent, setModeTeacher, setLanguage} from '../../action_creators';

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
import ModeIndicator from './ModeIndicator';
import NavLink from './NavLink';

export const NavBar = React.createClass({

  getNativeLanguageName(language) {
    const nativeLanguages = {
      'nn': 'Norsk bokmål',
      'nb': 'Norsk nynorsk',
      'sv': 'Svenska',
      'en': 'English',
      'da': 'Dansk'
    }

    return nativeLanguages[language];
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
          <Navbar fluid={true} fixedTop={true}>
            <Dropdown id='language-dropdown' className='btn-language-dropdown pull-right'
              onSelect={(eventKey) => this.props.setLanguage(eventKey)}>
              <Dropdown.Toggle className={this.props.isStudentMode
                ? 'btn-language-student btn-language' : 'btn-language-teacher btn-language'}>
                {this.getNativeLanguageName(this.props.language)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey='nn'>{this.getNativeLanguageName('nn')}</MenuItem>
                <MenuItem eventKey='nb'>{this.getNativeLanguageName('nb')}</MenuItem>
                <MenuItem eventKey='sv'>{this.getNativeLanguageName('sv')}</MenuItem>
                <MenuItem eventKey='da'>{this.getNativeLanguageName('da')}</MenuItem>
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
)(NavBar);
