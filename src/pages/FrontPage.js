import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import styles from './FrontPage.scss';
import Filter from '../components/FrontPage/Filter';
import {CoursesContainer} from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import WelcomeBox from '../components/FrontPage/WelcomeBox';
import {getTranslator} from '../selectors/translate';

export const  FrontPage = React.createClass({

  render() {
    return (
      <Grid fluid={true}>

        {/*WelcomeBox*/}
        {this.props.isStudentMode
          ? <Row>
              <WelcomeBox isStudentMode={false}/>
            </Row>
          : null}

        {/*TeacherInfobox*/}
        <Row>
          <TeacherInfobox isStudentMode={this.props.isStudentMode}/>
        </Row>
        <hr/>

        {/* Filter and courses */}
        <Row>
          <Col sm={4} md={3} lg={2}>
            <Filter isStudentMode={this.props.isStudentMode}/>
          </Col>
          <CoursesContainer/>
        </Row>
      </Grid>
    );
  }

});

FrontPage.propTypes = {
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const FrontPageContainer = connect(
  mapStateToProps
)(withStyles(styles)(FrontPage));
