import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LessonItemContainer} from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styles from './LessonList.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const LessonList = React.createClass({
  render() {
    const {lessons, level, t} = this.props;
    return (
      <div id={this.props.id} className={styles.list}>
        <h3>
          <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
        </h3>
        <ListGroup>
          {lessons.map((lesson, idx) =>
            lesson.indexed ?
              <LessonItemContainer key={idx} lesson={lesson}/>
              : null
          )}
        </ListGroup>
      </div>
    );
  }
});

LessonList.propTypes = {
  lessons: PropTypes.array,
  level: PropTypes.string,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(LessonList));
