import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import LevelIcon from '../LevelIcon';

export const LessonItem = React.createClass({
  render() {
    const lesson = this.props.lesson;
    const levelIcon = <LevelIcon level={lesson.level}/>;
    const instructionBtn = !this.props.isStudentMode && lesson.readmePath ?
      <LinkContainer to={lesson.readmePath}>
        <Button componentClass="div" className={styles.instructionBtn} bsSize="xs">Veiledning</Button>
      </LinkContainer>
      : null;
    return (
      lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank">
          {levelIcon}
          {instructionBtn}
          {lesson.title}
          &nbsp;<Glyphicon glyph="new-window"/>
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem>
            {levelIcon}
            {instructionBtn}
            {lesson.title}
          </ListGroupItem>
        </LinkContainer>
    );
  }
});

LessonItem.propTypes = {
  lesson: PropTypes.object,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const LessonItemContainer = connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
