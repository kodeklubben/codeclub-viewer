import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styles from './LessonList.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const LessonList = ({lessons, level, t, id}) => {
  return (
    <div {...{id}} className={styles.list}>
      <h3>
        <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </h3>
      <ListGroup>
        {lessons.map(lesson =>
          lesson.indexed ?
            <LessonItem key={lesson.path} {...{lesson}}/>
            : null
        )}
      </ListGroup>
    </div>
  );
};

LessonList.propTypes = {
  // ownProps
  lessons: PropTypes.array,
  level: PropTypes.string,
  id: PropTypes.string,

  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonList));
