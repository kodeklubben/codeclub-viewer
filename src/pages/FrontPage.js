import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Filter from '../components/FrontPage/Filter';
import {CoursesContainer} from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import WelcomeBox from '../components/FrontPage/WelcomeBox';

export const  FrontPage = React.createClass({
  componentDidMount() {
    document.title = 'Kodeklubben';
  },
  render() {
    const {isStudentMode} = this.props;
    return (
      <Grid fluid={true}>
        {/*WelcomeBox and TeacherInfobox*/}
        {isStudentMode ? <WelcomeBox /> : <TeacherInfobox />}

        <hr/>
        {/* Filter and courses */}
        <Row>
          <Col sm={4} md={3} lg={2}>
            <Filter isStudentMode={isStudentMode}/>
          </Col>
          <CoursesContainer/>
        </Row>
      </Grid>
    );
  }

});

FrontPage.propTypes = {
  isStudentMode: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode
});

export const FrontPageContainer = connect(
  mapStateToProps
)(FrontPage);
