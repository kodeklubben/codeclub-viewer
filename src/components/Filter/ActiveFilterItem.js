import React, {PropTypes} from 'react';
import styles from './ActiveFilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ActiveFilterItem = ({tagName, onClick}) => {
  return (
    <span>
      <Button className={styles.item} onClick={onClick}>
        <Glyphicon glyph={'glyphicon glyphicon-remove'} className={styles.remove}/> {tagName}
      </Button>
    </span>
  );
};

ActiveFilterItem.propTypes = {
  tagName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ActiveFilterItem);
