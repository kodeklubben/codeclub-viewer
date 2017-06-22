import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';

export const LessonItem = React.createClass({
  render() {
    const {t, lesson} = this.props;
    const levelIcon = <LevelIcon level={lesson.level}/>;
    const instructionBtn = !this.props.isStudentMode && lesson.readmePath ?
      <LinkContainer to={lesson.readmePath}>
        <Button componentClass="div" className={styles.instructionBtn} bsStyle="guide" bsSize="xs">
          {t('playlist.instructionbutton')}
        </Button>
      </LinkContainer>
      : null;
    const tooltip =
      <Tooltip id="lessonIntro">
        <p>TEST</p>
      </Tooltip>;
    return (
      lesson.external ?
        <OverlayTrigger animation={true} delayShow={300} placement="bottom" overlay={tooltip}>
          <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
            {levelIcon}
            <div className={styles.title}>{lesson.title}</div>
            {instructionBtn}
            &nbsp;<Glyphicon glyph="new-window"/>
          </ListGroupItem>
        </OverlayTrigger>
        :
        <OverlayTrigger animation={true} delayShow={300} placement="bottom" overlay={tooltip}>
          <LinkContainer to={lesson.path}>
            <ListGroupItem className={styles.row}>
              {levelIcon}
              <div className={styles.title}>{lesson.title}</div>
              {instructionBtn}
            </ListGroupItem>
          </LinkContainer>
        </OverlayTrigger>
    );
  }
});

LessonItem.propTypes = {
  lesson: PropTypes.object,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const LessonItemContainer = connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
