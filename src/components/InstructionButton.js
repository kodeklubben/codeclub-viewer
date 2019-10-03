import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './InstructionButton.scss';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../selectors/translate';
import {getLessonPath} from '../resources/lessonFrontmatter';

const InstructionButton = ({isReadme, onlyIcon, insideLink, router, path, buttonText}) => {
  useStyles(styles);
  const options = {
    className: onlyIcon ? styles.buttonOnlyIcon : styles.button,
    bsStyle: 'guide',
    bsSize: onlyIcon ? 'xs' : 'small',
    componentClass: insideLink ? 'div' : 'a',
    tabIndex: '0',
    'aria-label': buttonText,
    onKeyPress: () => router.push(path),
  };
  return (path ?
    <LinkContainer to={path}>
      <Button  {...options}>
        <Glyphicon className={styles.icon} glyph={isReadme ? 'education' : 'pencil'}/>
        <span className={onlyIcon ? '' : styles.textMargin}>{onlyIcon ? '' : buttonText}</span>
      </Button>
    </LinkContainer> :
    null
  );
};

InstructionButton.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  onlyIcon: PropTypes.bool,
  insideLink: PropTypes.bool, // set to true if button is nested inside a <a>...</a>
  router: PropTypes.object.isRequired,

  // mapStateToProps
  path: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => {
  const t = getTranslator(state);
  return {
    path: getLessonPath(course, lesson, language, isReadme),
    buttonText: t(isReadme ? 'lessons.toteacherinstruction' : 'lessons.tolesson'),
  };
};

export default connect(mapStateToProps)(withRouter(InstructionButton));
