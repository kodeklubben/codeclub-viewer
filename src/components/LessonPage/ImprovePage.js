import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ImprovePage.scss';
import {capitalize} from '../../utils/stringUtils';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import {getLessonPath} from '../../resources/lessonFrontmatter';

const ImprovePage = ({course, lesson, language, isReadme}) => {
  useStyles(styles);

  const isStudentMode = useSelector(state => state.isStudentMode);
  const t = useSelector(state => getTranslator(state));

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
    forum: 'https://forum.kidsakoder.no/c/oppgaver'
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
