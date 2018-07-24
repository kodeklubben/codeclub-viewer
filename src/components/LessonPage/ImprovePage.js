import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ImprovePage.scss';
import {capitalize} from '../../util.js';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';

const ImprovePage = ({course, lesson, language, isReadme, t, isStudentMode}) => {
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);
  const linkToSourceCode = `https://github.com/kodeklubben/oppgaver/tree/master/src/${course}/${lesson}`;
  const linkToLesson = `http://oppgaver.kidsakoder.no/${path}`;
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
              <Button href={url.newIssue} bsStyle="white-grey" target="_blank">
                {t('lessons.improvepage.newissuebutton')}</Button>
            </div>
            <div>
              <Button href={url.forum} bsStyle="guide" target="_blank">
                {t('lessons.improvepage.forumbutton')}</Button>
            </div>
            <div>
              <Button href={url.showCode} bsStyle="orange" target="_blank">
                {t('lessons.improvepage.showcodebutton')}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ImprovePage.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(ImprovePage));
