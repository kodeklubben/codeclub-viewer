import React, {PropTypes} from 'react';
import {capitalize} from '../../util';
import styles from './ActiveFilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


const ActiveFilterItem = React.createClass({
  render(){
    const tagItem = capitalize(this.props.tagItem);

    return (
      <span>
        <Button className={styles.item} onClick={() => this.props.onCheck}>
          <Glyphicon glyph={'glyphicon glyphicon-remove'} className={styles.remove}/> {tagItem}
        </Button>
      </span>
    );
  }
});

ActiveFilterItem.propTypes = {
  tagItem: PropTypes.string,
};

export default withStyles(styles)(ActiveFilterItem);
