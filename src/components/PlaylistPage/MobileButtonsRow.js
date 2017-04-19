import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const MobileButtonsRow = React.createClass({
  render() {
    return (
      <Row>
        <Col xs={12} smHidden mdHidden lgHidden>
          <Button onClick={() => this.props.toggle('Filter')}>
            Vis/skjul filter
          </Button>
        </Col>
      </Row>
    );
  }
});

MobileButtonsRow.propTypes = {
  toggle: PropTypes.func,
  showLevelNavigation: PropTypes.bool
};

export default MobileButtonsRow;
