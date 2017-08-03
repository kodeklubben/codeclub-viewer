import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {collapseFilterGroup} from '../../action_creators';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export const FilterGroup = ({groupKey, availableLessonsForTag, t, filterTags, onFilterCheck,
  collapseFilterGroup, filterGroupsCollapsed, language}) => {
  const groupName = translateGroup(t, groupKey);
  let filterItemsNumber = 0;
  if (groupName) {
    const filterItems = Object.keys(filterTags).map((tagKey) => {
      const onCheck = () => onFilterCheck(groupKey, tagKey);
      const numberOfLessonsForTag = availableLessonsForTag[tagKey];
      const tagName = translateTag(t, groupKey, tagKey);
      if (filterTags[tagKey]) {
        filterItemsNumber++;
      }
      return tagName ? (
        <FilterItem
          key={tagKey}
          tagName={tagName}
          numberOfLessons={numberOfLessonsForTag}
          checked={filterTags[tagKey]}
          onCheck={onCheck}
        />
      ) : null;
    });

    const isLanguage = groupKey === 'language';
    const nothingChecked = (!isLanguage && filterItemsNumber === 0) ||
      (isLanguage && filterTags[language] && filterItemsNumber === 1);
    const isCollapsed = nothingChecked && filterGroupsCollapsed[groupKey];

    const headingStyle = styles.name + (nothingChecked ? '' : ' ' + styles.somethingChecked);
    const onGroupClick = () => {
      if (nothingChecked) {
        collapseFilterGroup(groupKey, !isCollapsed);
      }
    };
    return (
      <ListGroupItem>
        <div className={headingStyle} onClick={onGroupClick}>
          <Glyphicon className={styles.glyph} glyph={isCollapsed ? 'chevron-right' : 'chevron-down'}/>
          {groupName}
        </div>
        <Collapse in={!isCollapsed}>
          <div>{filterItems}</div>
        </Collapse>
      </ListGroupItem>
    );
  }
  else {
    return null;
  }
};

FilterGroup.propTypes = {
  // ownProps:
  groupKey: PropTypes.string,
  availableLessonsForTag: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,

  // mapStateToProps:
  filterTags: PropTypes.object,
  filterGroupsCollapsed: PropTypes.object,
  language: PropTypes.string,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
  collapseFilterGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
  filterGroupsCollapsed: state.filterGroupsCollapsed,
  language: state.language
});

const mapDispatchToProps = {
  onFilterCheck,
  collapseFilterGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
