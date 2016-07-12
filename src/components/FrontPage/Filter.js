import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

import {LessonFilterContainer} from '../Filter/LessonFilter';

const Filter = React.createClass({

  getInitialState() {
    return {
      showMobileFilter: false
    };
  },

  render() {
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
          <Button bsStyle='success' onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
            <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
            Vis/skjul filter
          </Button>
          <br/>
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

export default Filter;
