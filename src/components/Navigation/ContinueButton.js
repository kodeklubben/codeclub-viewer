import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory, matchPath} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import Button from 'react-bootstrap/lib/Button';
import styles from './ContinueButton.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getLessonPath, getLanguageAndIsReadme} from '../../resources/lessonFrontmatter';

const ContinueButton = () => {
  useStyles(styles);

  const {t, lastLesson, isStudentMode} = useSelector(state => ({
    t: getTranslator(state),
    lastLesson: state.lastLesson,
    isStudentMode: state.isStudentMode,
  }));

  const history = useHistory();
  const match = matchPath(history.location.pathname, {path: '/:course/:lesson/:file'});
  const {course, lesson, file} = match != null ? match.params : '';

  const isLesson = !!lesson;
  const {language, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const path = getLessonPath(course, lesson, language, isReadme);
  const hasLastLesson = lastLesson !== '';
  const pathIsNotLastLesson = lastLesson !== path;
  const options = {
    'aria-label': t('frontpage.continueButton'),
    className: styles.container,
    bsStyle: isStudentMode ? 'language-student' : 'language-teacher'
  };
  return hasLastLesson && pathIsNotLastLesson ?
    <LinkContainer active={false} to={lastLesson}>
      <Button {...options}>
        <Glyphicon glyph={'arrow-right'}/>
        <span className={styles.textMargin}>{t('frontpage.continueButton')}</span>
      </Button>
    </LinkContainer>
    : null;
};

export default ContinueButton;
