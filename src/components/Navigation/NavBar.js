import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import {setModeStudent, setModeTeacher} from '../../action_creators';
import ModeIndicator from './ModeIndicator';
import NavLink from './NavLink';
import Flag from '../Flags/Flag';
import styles from './NavBar.scss';

export const NavBar = React.createClass({

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
        <Row className={styles.flagGroup}>
          <Flag country='norway' />
          <Flag country='sweden' />
          <Flag country='denmark' />
        </Row>
        <Row>
          <Navbar className={this.props.isStudentMode ? null : 'navbar-teacher'} fluid={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to="/" onlyActiveOnIndex>
                  <Glyphicon glyph="home"/>
                </NavLink>
                {courseLink ? <span> / {courseLink}</span> : null}
                {lessonLink ? <span className="hidden-xs"> / {lessonLink}</span> : null}
              </Navbar.Brand>
              <Navbar.Toggle className={this.props.isStudentMode ? null : 'toggle-teacher'}/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type="text" placeholder="Søk"/>
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
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
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
    setModeStudent,
    setModeTeacher
  }
)(withStyles(styles)(NavBar));
