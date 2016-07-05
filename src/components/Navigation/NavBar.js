import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NavLink from './NavLink';
import styles from './NavBar.scss';
import ToggleButton from './ToggleButton';
import {Grid, Row} from 'react-bootstrap';

import FlagGroup from './FlagGroup';

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
          <FlagGroup />
        </Row>
        <Row>
          <div className={styles.header}>
            <div className={styles.lhs}>
              <NavLink to="/" onlyActiveOnIndex>Front Page</NavLink>
              {courseLink ? <span> / {courseLink}</span> : null}
              {lessonLink ? <span> / {lessonLink}</span> : null}
            </div>
            <div className={styles.rhs}>
              <input type='text' placeholder='Søk' />
              {<ToggleButton from='ELEV' to='LÆRER' onClick={() => this.setState({ student: !this.state.student })} />}
            </div>
          </div>
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
