import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ImprovePage.scss';
import {capitalize} from '../../utils/stringUtils';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import {getLessonPath} from '../../resources/lessonFrontmatter';

// Lessoneditor: makes the user's own copy of the lesson, and sends the changes back to
// kodeklubben/oppgaver as a pull request.
const LESSON_EDITOR = 'https://lessoneditor.ew.r.appspot.com';

const ImprovePage = ({course, lesson, language, isReadme}) => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));
  const isStudentMode = useSelector(state => state.isStudentMode);

  const path = getLessonPath(course, lesson, language, isReadme);
  const linkToSourceCode = `https://github.com/kodeklubben/oppgaver/tree/master/src${path}.md`;
  const linkToLesson = `https://oppgaver.kidsakoder.no${path}`;
  const newIssueFill = '?title=' + t('lessons.improvepage.newissuelink.title') + ' \'' +
                       capitalize(course) + ': ' + capitalize(lesson).replace(/_/g, ' ') + '\'' +
                       '&body=' + t('lessons.improvepage.newissuelink.lesson') + ': ' + linkToLesson +
                       '%0A' + t('lessons.improvepage.newissuelink.sourcecode') + ': ' + linkToSourceCode +
                       '%0A%0A' + t('lessons.improvepage.newissuelink.info') + '%0A';

  const url = {
    // Link to making a new issue + title and body fill
    newIssue: 'https://github.com/kodeklubben/oppgaver/issues/new/' + newIssueFill,
    // Link to source code
    showCode: linkToSourceCode,
    //Link to forum
    forum: 'https://forum.kidsakoder.no/c/oppgaver',
    // Link to editing a copy of the lesson in lessoneditor
    edit: `${LESSON_EDITOR}/rediger/${encodeURIComponent(course)}/${encodeURIComponent(lesson)}`,
  };
  return (
    <div className={styles.container}>
      <div className={isStudentMode ? styles.student : styles.teacher}>
        <div className={styles.improvePageBox}>
          <div className={isStudentMode ? styles.textRowStudent : styles.textRowTeacher}>
            <h2>{t('lessons.improvepage.header')}</h2>
            <p>{t('lessons.improvepage.textline1')} <br/>
              {t('lessons.improvepage.textline2')}</p>
          </div>
          <div className={styles.linkRow}>
            <div>
              <Button href={url.newIssue} bsStyle='white-grey' target='_blank' rel='noopener'>
                {t('lessons.improvepage.newissuebutton')}</Button>
            </div>
            <div>
              <Button href={url.forum} bsStyle='guide' target='_blank' rel='noopener'>
                {t('lessons.improvepage.forumbutton')}</Button>
            </div>
            <div>
              <Button href={url.showCode} bsStyle='orange' target='_blank' rel='noopener'>
                {t('lessons.improvepage.showcodebutton')}</Button>
            </div>
            <div>
              <Button href={url.edit} bsStyle='student' target='_blank' rel='noopener'
                title={t('lessons.improvepage.editbuttontitle')}>
                {t('lessons.improvepage.editbutton')}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ImprovePage.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default ImprovePage;
