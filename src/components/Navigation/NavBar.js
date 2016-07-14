import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeMode} from '../../action_creators';

import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Nav from 'react-bootstrap/lib/Nav';

import NavLink from './NavLink';
import FlagGroup from './FlagGroup';

export const NavBar = React.createClass({

  getInitialState() {
    return {
      selectedLanguage: "norway"
    };
  },

  handle(eventKey) {
    switch (eventKey) {
      case 'norway':
        this.setState({selectedLanguage: eventKey});
        break;
      case 'sweden':
        this.setState({selectedLanguage: eventKey});
        break;
      case 'denmark':
        this.setState({selectedLanguage: eventKey});
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
          <FlagGroup />
        </Row>
        <Row>
          <Navbar fluid={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to="/" onlyActiveOnIndex>
                  <Glyphicon glyph="home"/>
                </NavLink>
                {courseLink ? <span> / {courseLink}</span> : null}
                {lessonLink ? <span className="hidden-xs"> / {lessonLink}</span> : null}
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type="text" placeholder="Søk"/>
                </FormGroup>
                {' '}
                {this.props.isStudentMode ?
                  <Button bsStyle="primary" onClick={() => this.props.changeMode()}>LÆRER</Button>
                  :
                  <Button bsStyle="success" onClick={() => this.props.changeMode()}>ELEV</Button>
                }
                {' '}
                <Nav>
                  <NavDropdown title={this.state.selectedLanguage} id="basic-nav-dropdown" onSelect={(eventKey) => this.handle(eventKey)}>
                    <MenuItem eventKey={"norway"}>Action 1</MenuItem>
                    <MenuItem eventKey={"sweden"}>Action 2</MenuItem>
                    <MenuItem eventKey={"denmark"}>Action 3</MenuItem>
                  </NavDropdown>
                </Nav>
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
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const NavBarContainer = connect(
  mapStateToProps,
  {
    changeMode
  }
)(NavBar);
