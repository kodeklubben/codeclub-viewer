import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import ActiveFilterItem from '../Filter/ActiveFilterItem';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import {getTranslator} from '../../selectors/translate';


import {LessonFilterContainer} from '../Filter/LessonFilter';

const Filter = React.createClass({

  getInitialState() {
    return {
      showMobileFilter: false
    };
  },

  render() {
    const {t} = this.props;
    const filter = this.props.filter || {};

    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const group = filter[groupName];

      const activeFilterItems = Object.keys(group).map((tagItem, idx) => {
        const onClick = () => this.props.onFilterCheck(groupName, tagItem);

        if (group[tagItem]){
          return (
              <ActiveFilterItem key={idx} tagItem={tagItem} onClick={onClick}/>
          );
        }
      });

      return activeFilterItems;
    });

    return (
      <div>
        {/*Filter desktop*/}
        <Col xsHidden>
          <LessonFilterContainer/>
        </Col>

        {/*Filter mobile*/}
        <Col smHidden mdHidden lgHidden>
          {filterGroups}
          <br/>
          <Button className={this.props.isStudentMode ? 'btn-student' : 'btn-teacher'}
            onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
            <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
            {t('frontpage.showhidefilter')}
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

Filter.propTypes = {
  onFilterCheck: PropTypes.func,
  filter: PropTypes.object,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  t: getTranslator(state)
});

const mapDispatchToProps = {
  onFilterCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
