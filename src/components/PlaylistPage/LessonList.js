import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LessonItemContainer} from './LessonItem';
import {getLevelName} from '../../util';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
  
const LessonList = React.createClass({
  render() {
    const {t} = this.props;
    const lessons = this.props.lessons;
    const level = this.props.level;
    return (
      <div id={this.props.id}>
        <h3><LevelIcon level={level}/>'{getLevelName(level)}'{' - ' + t('general.level') + ' ' + level}</h3>
        <h3><LevelIcon level={level}/>'{getLevelName(level)}'{' - ' + t('general.level') + ' ' + level}</h3>
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
  }
}

export default connect(mapStateToProps)(LessonList);
