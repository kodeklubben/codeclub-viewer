import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';
import styles from './Filter.scss';

const BREAK_POINT = 768;

const LessonFilter = React.createClass({
  getInitialState: function() {
    const screenWidth = window.innerWidth;
    return {
      showFilter: screenWidth > BREAK_POINT,
      screenWidth
    };
  },
  handleResize: function(e) {
    const screenWidth = window.innerWidth;
    this.setState({
      showFilter: screenWidth > BREAK_POINT,
      screenWidth
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleHeadingClicked() {
    if(this.state.screenWidth <= BREAK_POINT) this.setState({showFilter: !this.state.showFilter});
  },
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
          <div className={'panel-heading ' + styles.filterHeading} onClick={this.handleHeadingClicked}>
            <h3 className='panel-title'>{this.state.screenWidth > BREAK_POINT ? 'Filter' : 'Vis filter'}</h3>
          </div>
          <div className={'panel-body ' + styles.noPaddingTop} style={this.state.showFilter ? null : {display: 'none'}}>
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
