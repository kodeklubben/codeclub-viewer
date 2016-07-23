import React, {PropTypes} from 'react';
import styles from './ModeIndicator.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const ModeIndicator = React.createClass({
  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className={styles.modeIndicator}>Du er i {this.props.isStudentMode ?
            <span className='text-student'>elevmodus</span>
            :
            <span className='text-teacher'>lærermodus</span>}
          </div>
        </Col>
      </Row>
    );
  }
});

ModeIndicator.propTypes = {
  isStudentMode: PropTypes.bool
};

export default withStyles(styles)(ModeIndicator);
