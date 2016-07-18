import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import {changeMode} from '../../action_creators';
import NavLink from './NavLink';
import SVGLoader from '../../assets/graphics/SVGLoader';
import styles from './NavBar.scss';

export const NavBar = React.createClass({
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
          <div className={styles.flagGroup}>
            <SVGLoader type='flag' item='norway'/>
            <SVGLoader type='flag' item='sweden'/>
            <SVGLoader type='flag' item='denmark'/>
          </div>
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
                {this.props.isStudentMode
                  ? <Button bsStyle="primary" onClick={() => this.props.changeMode()}>LÆRER</Button>
                  : <Button bsStyle="success" onClick={() => this.props.changeMode()}>ELEV</Button>}
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
)(withStyles(styles)(NavBar));
