import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NavLink from './NavLink';
import styles from './NavBar.scss';
import ToggleButton from './ToggleButton';
import FlagGroup from './FlagGroup';

import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

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
      <Navbar className={styles.navbar} fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onlyActiveOnIndex>Front Page</NavLink>
            {courseLink ? <span> / {courseLink}</span> : null}
            {lessonLink ? <span> / {lessonLink}</span> : null}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <ToggleButton from='ELEV' to='LÆRER' onClick={() => this.setState({ student: !this.state.student })} />
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
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
