import React, {PropTypes} from 'react';
import {capitalize, getLanguageName} from '../../util';
import styles from './ActiveFilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ActiveFilterItem = (props) => {
  let tagItem = props.groupName === 'language' ?
   getLanguageName(props.tagItem) : props.tagItem;
  tagItem = capitalize(tagItem);

  return (
    <span>
      <Button className={styles.item} onClick={props.onClick}>
        <Glyphicon glyph={'glyphicon glyphicon-remove'} className={styles.remove}/> {tagItem}
      </Button>
    </span>
  );
};

ActiveFilterItem.propTypes = {
  tagItem: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ActiveFilterItem);
