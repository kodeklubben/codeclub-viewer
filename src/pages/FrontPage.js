import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import styles from './FrontPage.scss';
import Filter from '../components/FrontPage/Filter';
import {CoursesContainer} from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import WelcomeBox from '../components/FrontPage/WelcomeBox';
import {setModeTeacher} from '../action_creators';
import {rememberLanguage} from '../localStorage';

export const  FrontPage = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },
  
  render() {
    const language = this.props.language;
    return (
      <Grid fluid={true}>
        {rememberLanguage(language)}
        {/* Buttons */}
        {this.props.isStudentMode
          ? <Row>
              <WelcomeBox isStudentMode={false}/>                           
            </Row>
          : null}

        {/* Teacher infobox */}
        <Row>
          <TeacherInfobox isStudentMode={this.props.isStudentMode}/>
        </Row>

        <hr/>

        {/* Filter and courses */}
        <Row>
          <Filter isStudentMode={this.props.isStudentMode}/>
          <CoursesContainer/>
        </Row>
      </Grid>
    );
  }

});

FrontPage.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  setModeTeacher: PropTypes.func,
  rememberLanguage: PropTypes.func,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    language: state.language
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  {
    setModeTeacher,
    rememberLanguage
  }
)(withStyles(styles)(FrontPage));
