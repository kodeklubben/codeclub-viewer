import React from 'react';
import {capitalize} from '../../util';
import {Button, Col, Row} from 'react-bootstrap';

const HeadRow = React.createClass({
  render() {
    return (
      <Row>
        <Col xs={12} sm={9} smOffset={3}>
          <h1>{capitalize(this.props.courseName)} Oppgaver &nbsp;
            <Button bsSize="large">Start her!</Button>
          </h1>
        </Col>
      </Row>
    );
  }
});

export default HeadRow;
