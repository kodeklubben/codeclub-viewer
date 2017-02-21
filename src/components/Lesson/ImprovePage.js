import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import styles from './ImprovePage.scss';
import {capitalize} from '../../util.js';


const ImprovePage = React.createClass({

  render() { 
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
      
      <Grid fluid={true} className={
        this.props.isStudentMode ? styles.improvePageBoxStudent : styles.improvePageBoxTeacher}>
          <div className={styles.improvePageBox}>
            <div>
              <h3>Forbedre denne siden</h3>
              <p>Funnet en feil? Kunne noe vært bedre? <br/>
              Hvis ja, vennligst gi oss tilbakemelding ved å lage en sak på Github eller fiks feilen selv om du kan. 
              Vi er takknemlige for enhver tilbakemelding!</p>
            </div>
            <div className={styles.improvePageBoxRow}>
                <div>
                  <a className={styles.newIssue} href={url.newIssue}>Rapporter et problem</a>
                </div>
                <div>
                  <a className={styles.showCode} href={url.showCode}>Vis koden og fiks selv</a>
                </div>
            </div>
          </div>
      </Grid>
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

export const ImprovePageContainer = connect(
  mapStateToProps,
)(withStyles(styles)(ImprovePage));

