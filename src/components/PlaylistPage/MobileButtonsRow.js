import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MobileButtonsRow.scss';

const MobileButtonsRow = React.createClass({
  getInitialState() {
    return {
      showFilter: false
    };
  },
  changeState() {
    this.setState({['showFilter']: !this.state['showFilter']});
  },
  render() {
    return (
      <Row>
        <Col xs={12} smHidden mdHidden lgHidden>
          <Button bsStyle={this.props.isStudentMode ? 'student' : 'teacher'} className={styles.toggleFilter}
            onClick={() => {this.props.toggle('Filter'); this.changeState()}}>
            <Glyphicon glyph={this.state.showFilter ? 'chevron-down' : 'chevron-right'}/>
            Vis/skjul filter
          </Button>
        </Col>
      </Row>
    );
  }
});

MobileButtonsRow.propTypes = {
  toggle: PropTypes.func,
  showLevelNavigation: PropTypes.bool,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const MobileButtonsRowContainer = connect(mapStateToProps)(withStyles(styles)(MobileButtonsRow));
