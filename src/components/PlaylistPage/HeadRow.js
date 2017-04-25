import React, {PropTypes} from 'react';
import {capitalize} from '../../util';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HeadRow.scss';

const HeadRow = React.createClass({
  render() {
    return (
      <div>
        <h1 className={styles.row}>{capitalize(this.props.courseName)} Oppgaver &nbsp;
        </h1>
      </div>
    );
  }
});

HeadRow.propTypes = {
  courseName: PropTypes.string
};

export default (withStyles(styles)(HeadRow));
