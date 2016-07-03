import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from '../components/CourseList/CourseList';
import LessonFilter from '../components/Filter/LessonFilter';
import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';
import {
  Button,
  Col,
  Collapse,
  Glyphicon,
  Grid,
  Row
} from 'react-bootstrap';

export const FrontPage = React.createClass({
  getInitialState() {
    return {showMobileFilter: false};
  },
  render() {
    return (
      <Grid fluid={true}>
        <Row>

          {/*Filter desktop*/}
          <Col xsHidden sm={4} md={3} lg={2}>
            <br/>
            <LessonFilter {...this.props}/>
          </Col>

          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden xs={12}>
            <br/>
            <Button bsStyle='success' onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
              <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
              Vis/skjul filter
            </Button>
            <br/>
            <br/>
            <Collapse in={this.state.showMobileFilter}>
              <div>
                <LessonFilter {...this.props}/>
              </div>
            </Collapse>
          </Col>

          <Col xs={12} sm={8} md={9} lg={10}>
            <h2>Kurs</h2>
            <CourseList courses={this.props.courses}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

FrontPage.propTypes = {
  courses: PropTypes.object,
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    filter: state.filter
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  actionCreators
)(FrontPage);
