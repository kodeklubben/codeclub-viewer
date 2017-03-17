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

    /*Temporary constraint mocks are used until they are implemented*/
    const constraintStyle = {float: 'right', color: 'gray', fontSize: '1.1em'};
    const constraints = (this.props.constraints || []).map((constraint, idx) => {
      switch (constraint) {
        case 'internet-explorer':
          return <span key={idx} style={constraintStyle}><Glyphicon glyph="fire"/></span>;
        case 'tablet':
          return <span key={idx} style={constraintStyle}><Glyphicon key={idx} glyph="phone"/></span>;
        case 'money':
          return <span key={idx} style={constraintStyle}><Glyphicon key={idx} glyph="euro"/></span>;
      }
      return null;
    });
    const levelIcon = <LevelIcon level={lesson.level}/>;
    const instructionBtn = !this.props.isStudentMode && lesson.readmePath ?
      <LinkContainer to={lesson.readmePath}>
        <Button componentClass="div" className={styles.instructionBtn} bsStyle="guide" bsSize="xs">Veiledning</Button>
      </LinkContainer>
      : null;
    return (
      lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
          {levelIcon}
          <div className={styles.title}>{lesson.title}</div>
          {constraints}
          {instructionBtn}
          &nbsp;<Glyphicon glyph="new-window"/>
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem className={styles.row}>
            {levelIcon}
            <div className={styles.title}>{lesson.title}</div>
            {constraints}
            {instructionBtn}
          </ListGroupItem>
        </LinkContainer>
    );
  }
});

LessonItem.propTypes = {
  constraints: PropTypes.array,
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
