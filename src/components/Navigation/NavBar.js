import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import NavLink from './NavLink';
import ToggleButton from './ToggleButton';
import SVGLoader from '../../assets/graphics/SVGLoader';
import styles from './NavBar.scss';

const NavBar = React.createClass({

  getInitialState() {
    return {
      student: true
    };
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;

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
                  <Glyphicon glyph="home" />
                </NavLink>
                {courseLink ? <span> / {courseLink}</span> : null}
                {lessonLink ? <span className="hidden-xs"> / {lessonLink}</span> : null}
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type="text" placeholder="Søk" />
                </FormGroup>
                {' '}
                <ToggleButton from='ELEV' to='LÆRER' onClick={() => this.setState({ student: !this.state.student })} />
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
  })
};

export default withStyles(styles)(NavBar);
