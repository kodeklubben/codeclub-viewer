import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeMode, setLanguageNorway, setLanguageSweden, setLanguageDenmark} from '../../action_creators';

import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import NavLink from './NavLink';

export const NavBar = React.createClass({

  getInitialState() {
    return {
      selectedLanguage: 'Norsk'
    };
  },

  handle(eventKey) {
    switch (eventKey) {
      case 'norway':
        this.props.setLanguageNorway();
        this.setState({selectedLanguage: 'Norsk'});
        break;
      case 'sweden':
        this.props.setLanguageSweden();
        this.setState({selectedLanguage: 'Svensk'});
        break;
      case 'denmark':
        this.props.setLanguageDenmark();
        this.setState({selectedLanguage: 'Dansk'});
    }
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;

    return (
      <Grid fluid={true}>
        <Row>
          <Navbar fluid={true} fixedTop={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to='/' onlyActiveOnIndex>
                  <Glyphicon glyph='home'/>
                </NavLink>
                {courseLink ? <span> / {courseLink}</span> : null}
                {lessonLink ? <span className='hidden-xs'> / {lessonLink}</span> : null}
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type='text' placeholder='Søk'/>
                </FormGroup>
                {' '}
                {this.props.isStudentMode
                  ? <Button bsStyle='primary' onClick={() => this.props.changeMode()}>LÆRER</Button>
                  : <Button bsStyle='success' onClick={() => this.props.changeMode()}>ELEV</Button>}
                {' '}
                <Dropdown id='btn-language-navbar' onSelect={(eventKey) => this.handle(eventKey)}>
                  <Dropdown.Toggle className='btn-language'>
                    {this.state.selectedLanguage}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey='norway'>Norsk</MenuItem>
                    <MenuItem eventKey='sweden'>Svensk</MenuItem>
                    <MenuItem eventKey='denmark'>Dansk</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Form>
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
  changeMode: PropTypes.func,
  isStudentMode: PropTypes.bool,
  setLanguageNorway: PropTypes.func,
  setLanguageSweden: PropTypes.func,
  setLanguageDenmark: PropTypes.func
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
    changeMode,
    setLanguageNorway,
    setLanguageSweden,
    setLanguageDenmark
  }
)(NavBar);
