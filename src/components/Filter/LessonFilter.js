import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';
import styles from './Filter.scss';

const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter;
    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <div key={idx}>
          <FilterGroup groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
        </div>
      );
    });
    return (
      <div>
        <div className='panel panel-success'>
          <div className={'panel-heading ' + styles.filterHeading}>
            <h3 className='panel-title'>Filter</h3>
          </div>
          <div className={'panel-body ' + styles.noPaddingTop}>
            {filterGroups}
          </div>
        </div>
      </div>
    );
  }
});

LessonFilter.propTypes = {
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

export default LessonFilter;
