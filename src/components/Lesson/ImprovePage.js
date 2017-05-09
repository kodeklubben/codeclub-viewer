import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ImprovePage.scss';
import {capitalize} from '../../util.js';
import Button from 'react-bootstrap/lib/Button';

const ImprovePage = React.createClass({

  render() {
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
                <h2>Forbedre denne siden</h2>
                <p>Funnet en feil? Kunne noe vært bedre? <br/>
                Hvis ja, vennligst gi oss tilbakemelding ved å lage en sak på Github eller fiks feilen selv om du kan. 
                Vi er takknemlige for enhver tilbakemelding!</p>
              </div>
              <div className={styles.linkRow}>
                  <div>
                    <Button href={url.newIssue} bsStyle="white-grey">Rapporter et problem</Button>
                  </div>
                  <div>
                    <Button href={url.showCode} bsStyle="orange">Vis koden og fiks selv</Button>
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
  courseLessonFileProp: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const ImprovePageContainer = connect(mapStateToProps)(withStyles(styles)(ImprovePage));
