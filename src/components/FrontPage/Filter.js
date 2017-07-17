import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';

import {getTranslator} from '../../selectors/translate';
import FilterLabels from '../Filter/FilterLabels';
import LessonFilter from '../Filter/LessonFilter';

const Filter = React.createClass({

  getInitialState() {
    return {
      showMobileFilter: false
    };
  },

  render() {
    const {isStudentMode, courseName, t} = this.props;

    return (
      <div>
        {/*Filter desktop*/}
        <Col xsHidden>
          <LessonFilter courseName={courseName}/>
        </Col>

        {/*Filter mobile*/}
        <Col smHidden mdHidden lgHidden>
          <FilterLabels t={t}/>
          <Button className={isStudentMode ? 'btn-student' : 'btn-teacher'}
            onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
            <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
            {t('frontpage.showhidefilter')}
          </Button>
          <br/>

          <br/>
          <Collapse in={this.state.showMobileFilter}>
            <div>
              <LessonFilter courseName={courseName}/>
            </div>
          </Collapse>
        </Col>
      </div>
    );
  }
});

Filter.propTypes = {
  // ownProps:
  isStudentMode: PropTypes.bool,
  courseName: PropTypes.string,

  // mapStateToProps:
  t: PropTypes.func
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(Filter);
