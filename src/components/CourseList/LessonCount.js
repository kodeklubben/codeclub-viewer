import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Flag from '../Flag';
import styles from './LessonCount.scss';
import {getAvailableLanguages} from '../../util';
import {getTranslator} from '../../selectors/translate';

const LessonCount = ({count, language, showFlag, t}) => {
  return (
    <div>
      {showFlag ? <Flag {...{language}}/> : null}
      <span className={showFlag ? styles.flag : styles.noFlag}>{t('frontpage.lessoncount', {count})}</span>
    </div>
  );
};

LessonCount.propTypes = {
  // ownProps
  count: PropTypes.number.isRequired,
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
  showFlag: PropTypes.bool,

  // mapStateToProps
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonCount));
