import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeMode, setLanguage} from '../../action_creators';

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

  handle(language) {
    switch (language) {
      case 'norwegian':
        this.props.setLanguage(language);
        break;
      case 'norwegian-nynorsk':
        this.props.setLanguage(language);
        break;
      case 'swedish':
        this.props.setLanguage(language);
        break;
      case 'danish':
        this.props.setLanguage(language);
    }
  },

  getLanguageName(language) {
    switch(language) {
      case 'norwegian':
        return 'Norsk';
      case 'norwegian-nynorsk':
        return 'Norsk-Nynorsk'
      case 'swedish':
        return 'Svensk'
      case 'english':
        return 'Engelsk'
      case 'danish':
        return 'Dansk'
    }
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>
        {(params.lesson).replace(/_/g, ' ')}
      </NavLink> : null;

    return (
      <Grid fluid={true}>
        <Row>
          <Navbar fluid={true} fixedTop={true}>
            <Dropdown id='language-dropdown' className='btn-language-dropdown pull-right'
              onSelect={(eventKey) => this.handle(eventKey)}>
              <Dropdown.Toggle className={this.props.isStudentMode
                ? 'btn-language-student btn-language' : 'btn-language-teacher btn-language'}>
                {this.getLanguageName(this.props.language)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey='norwegian'>Norsk</MenuItem>
                <MenuItem eventKey='norwegian-nynorsk'>Norsk-Nynorsk</MenuItem>
                <MenuItem eventKey='swedish'>Svensk</MenuItem>
                <MenuItem eventKey='danish'>Dansk</MenuItem>
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
  setLanguage: PropTypes.func
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
    setLanguage
  }
)(NavBar);
