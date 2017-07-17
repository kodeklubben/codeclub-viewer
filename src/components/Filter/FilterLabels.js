import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import ActiveFilterItem from './ActiveFilterItem';
import {translateTag} from '../../util';

const FilterLabels = ({t, filter, onFilterCheck}) => {
  const labels = [];
  for (let groupKey of Object.keys(filter)) {
    const group = filter[groupKey];
    for (let tagKey of Object.keys(group)) {
      const checked = group[tagKey];
      if (checked) { // Only include labels if they are checked
        const tagName = translateTag(t, groupKey, tagKey);
        if (tagName) { // Only include labels if they are translated
          const onClick = () => onFilterCheck(groupKey, tagKey);
          labels.push(<ActiveFilterItem key={`${groupKey}_${tagKey}`} tagName={tagName} onClick={onClick}/>);
        }
      }
    }
  }
  return <div>{labels}</div>;
};
FilterLabels.propTypes = {
  // ownProps:
  t: PropTypes.func.isRequired,

  // mapStateToProps:
  filter: PropTypes.object.isRequired,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = {
  onFilterCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLabels);
