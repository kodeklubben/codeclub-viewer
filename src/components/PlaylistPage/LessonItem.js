import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';

const divStyle = {
  backgroundColor: 'green'
};

const getCheckboxes = (path, checkboxes) => {
  let checkboxKeys = Object.keys(checkboxes);
  console.log(checkboxKeys);
  //let trueCheckboxes = 0;
  for (let i = 0; i < checkboxKeys.length; i++) {
    checkboxKeys[i] = checkboxKeys[i].replace('checkboxes_','/');
    if (checkboxKeys[i] === path) {
      let checkboxObject = Object.values(checkboxes[checkboxKeys[i]]);
      console.log(checkboxObject);
      if (checkboxObject === true) {
        //trueCheckboxes++;
      }
    }
  }
  //console.log(trueCheckboxes/checkboxObject.length);
};

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
    return (
      lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
          {levelIcon}
          <div className={styles.title}>{lesson.title}</div>
          {instructionBtn}
          &nbsp;<Glyphicon glyph="new-window"/>
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem style={divStyle} className={styles.row}>
            {getCheckboxes(this.props.lesson.path, this.props.checkboxes)}
            {levelIcon}
            <div className={styles.title}>{lesson.title}</div>
            {instructionBtn}
          </ListGroupItem>
        </LinkContainer>
    );
  }
});

LessonItem.propTypes = {
  lesson: PropTypes.object,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func,
  checkboxes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state),
    checkboxes: state.checkboxes
  };
}

export const LessonItemContainer = connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
