import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {capitalize} from '../../util';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HeadRow.scss';

const HeadRow = React.createClass({
  render() {
  	const {t} = this.props;
    return (
      <div>
        <h1 className={styles.row}>{capitalize(this.props.courseName)} {t('playlist.lessons')}
        </h1>
      </div>
    );
  }
});

HeadRow.propTypes = {
  courseName: PropTypes.string
};

function mapStateToProps(state) {
	return {
		t: getTranslator(state)
	}
}

export default connect(mapStateToProps)(withStyles(styles)(HeadRow));
