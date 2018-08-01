import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import styles from './StartButton.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const StartButton = ({t, lastLesson}) => {
  const hasLastLesson = lastLesson !== '';
  return (
    <div className={styles.center}>
      <LinkContainer to={hasLastLesson ? lastLesson : t('frontpage.button.startlink')}>
        <Button bsStyle='student-frontpage'>
          <h1 className={styles.buttonText}>
            {hasLastLesson ? t('frontpage.button.continue') : t('frontpage.button.start')}
          </h1>
        </Button>
      </LinkContainer>
    </div>
  );
};

StartButton.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  lastLesson: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  lastLesson: state.lastLesson
});

export default connect(
  mapStateToProps
)(withStyles(styles)(StartButton));
