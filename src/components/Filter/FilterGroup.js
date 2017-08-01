import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export const FilterGroup = React.createClass({
  getInitialState() {
    return {
      showFilterTags: false
    };
  },
  changeState() {
    this.setState({['showFilterTags']: !this.state['showFilterTags']});
  },
  render() {
    const {groupKey, /*availableLessonsForTag,*/ t, filterTags, onFilterCheck} = this.props;
    const {showFilterTags} = this.state;
    const groupName = translateGroup(t, groupKey);
    if (groupName) {
      const filterItems = Object.keys(filterTags).map((tagKey) => {
        const onCheck = () => onFilterCheck(groupKey, tagKey);
        //const numberOfLessonsForTag = availableLessonsForTag[tagKey];
        const tagName = translateTag(t, groupKey, tagKey);

        return tagName ? (
          <FilterItem
            key={tagKey}
            tagName={tagName}
            //numberOfLessons={numberOfLessonsForTag}
            checked={filterTags[tagKey]}
            onCheck={onCheck}
          />
        ) : null;
      });
      return (
        <ListGroupItem>
          <div className={styles.name} onClick={this.changeState}>
            <Glyphicon className={styles.glyph} glyph={!showFilterTags ? 'chevron-right' : 'chevron-down'}/>
            {groupName}
          </div>
          <Collapse in={showFilterTags}>
            <div>{filterItems}</div>
          </Collapse>
        </ListGroupItem>
      );
    }
    else {
      return null;
    }
  }
});

FilterGroup.propTypes = {
  // ownProps:
  groupKey: PropTypes.string,
  //availableLessonsForTag: PropTypes.object.isRequired,
  t: PropTypes.func,

  // mapStateToProps:
  filterTags: PropTypes.object,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
});

const mapDispatchToProps = {
  onFilterCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
