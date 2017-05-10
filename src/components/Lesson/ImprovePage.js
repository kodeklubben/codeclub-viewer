import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ImprovePage.scss';
import {capitalize} from '../../util.js';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';

const ImprovePage = React.createClass({

  render() {
    const {t} = this.props;
    const isStudent = this.props.isStudentMode;
    const courseName = this.props.courseLessonFileProp.course;
    const lessonName = this.props.courseLessonFileProp.lesson;
    
    // Link to making a new issue + title,body fill
    const createNewIssueLink = '?title=' + capitalize(courseName) + ': ' + capitalize(lessonName).replace(/_/g, ' ')
     + '&body=Beskriv ditt problem...';
    // Link to the problem on github
    const githubLink = courseName + '/' + lessonName;

    const url = {
      newIssue: 'https://github.com/kodeklubben/oppgaver/issues/new/' + createNewIssueLink,
      showCode: 'https://github.com/kodeklubben/oppgaver/tree/master/src/' + githubLink
    };
    return (
      <div className={styles.container}>
        <div className={isStudent ? styles.student : styles.teacher}>
            <div className={styles.improvePageBox}>
              <div className={isStudent ? styles.textRowStudent : styles.textRowTeacher}>
                <h2>{t('lessons.improvepage.header')}</h2>
                <p>{t('lessons.improvepage.textline1')} <br/>
                {t('lessons.improvepage.textline2')}</p>
              </div>
              <div className={styles.linkRow}>
                  <div>
                    <Button href={url.newIssue} bsStyle="white-grey">{t('lessons.improvepage.newissue')}</Button>
                  </div>
                  <div>
                    <Button href={url.showCode} bsStyle="orange">{t('lessons.improvepage.showcode')}</Button>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

ImprovePage.propTypes = {
  isStudentMode: PropTypes.bool,
  courseLessonFileProp: PropTypes.object,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const ImprovePageContainer = connect(mapStateToProps)(withStyles(styles)(ImprovePage));
