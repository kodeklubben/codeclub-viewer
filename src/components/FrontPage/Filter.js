import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import ActiveFilterItem from '../Filter/ActiveFilterItem';
import {connect} from 'react-redux';


import {LessonFilterContainer} from '../Filter/LessonFilter';

const Filter = React.createClass({

  getInitialState() {
    return {
      showMobileFilter: false
    };
  },

  render() {
    const activeFilterItems = Object.keys(this.props.filter.operativsystem).map((tagItem, idx) => {
      const onCheck = () => this.props.onFilterCheck(tagItem);

      if (this.props.filter.operativsystem[tagItem]){
        return (
            <ActiveFilterItem key={idx} tagItem={tagItem} onCheck={onCheck}/>
        );
      }

    });
    return (
      <div>
        {/*Filter desktop*/}
        <Col xsHidden sm={4} md={3} lg={2}>
          <br/>
          <LessonFilterContainer/>
        </Col>

        {/*Filter mobile*/}
        <Col smHidden mdHidden lgHidden xs={12}>
          <br/>
          <Button className={this.props.isStudentMode ? 'btn-student' : 'btn-teacher'}
            onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
            <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
            Vis/skjul filter
          </Button>
          <br/>

          {activeFilterItems}

          <br/>
          <Collapse in={this.state.showMobileFilter}>
            <div>
              <LessonFilterContainer/>
            </div>
          </Collapse>
        </Col>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    filter: state.filter,
  };
}

export default connect(mapStateToProps)(Filter);
