import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Filter from '../FrontPage/Filter';
import LevelNavigation from './LevelNavigation';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const MobileComponents = React.createClass({
  getInitialState() {
    return {
      showFilter: false
    };
  },
  toggle(componentName) {
    this.setState({['show'+componentName]: !this.state['show'+componentName]});
  },
  render() {
    return (
      <div>
        <Row>
          <Col smHidden mdHidden lgHidden xs={12}>
            <div>
              <Filter isStudentMode={this.props.isStudentMode}/>
            </div>

            {/*Level navigation mobile*/}
            <div>
              {this.props.showLevelNavigation ? <LevelNavigation levels={this.props.levels}/> : null}
            </div>

          </Col>
        </Row>
      </div>
    );
  }
});

MobileComponents.propTypes = {
  showLevelNavigation: PropTypes.bool,
  levels: PropTypes.array,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}


export default connect(
  mapStateToProps
)(MobileComponents);
