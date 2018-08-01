import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import styles from './ContinueButton.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ContinueButton = ({t, lastLesson, isStudentMode}) => {
  const hasLastLesson = lastLesson !== '';
  const options = {
    'aria-label': t('frontpage.continueButton'),
    active: false,
    className: styles.container,
    bsStyle: isStudentMode ? 'language-student' : 'language-teacher'
  };
  const button = (
    <Button {...options}>
      <Glyphicon glyph={'arrow-right'}/>
      <span className={styles.textMargin}>{t('frontpage.continueButton')}</span>
    </Button>
  );
  return hasLastLesson ? <LinkContainer active={false} to={lastLesson}>{button}</LinkContainer> : null;
};

ContinueButton.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  lastLesson: PropTypes.string.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  lastLesson: state.lastLesson,
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(ContinueButton));
