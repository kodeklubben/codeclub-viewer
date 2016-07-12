import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onConstraintCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';

export const ConstraintFilterGroup = React.createClass({
  render() {
    const constraints = Object.keys(this.props.constraintFilter).map((constraint, idx) => {
      const checked = this.props.constraintFilter[constraint];
      return <FilterItem key={idx} name={constraint} checked={checked}
                         onCheck={() => this.props.onConstraintCheck(constraint)}/>;
    });
    return (
      <div className={styles.filterGroup}>
        <h4>Ikke vis:</h4>
        {constraints}
      </div>
    );
  }
});

ConstraintFilterGroup.propTypes = {
  constraintFilter: PropTypes.object,
  onConstraintCheck: PropTypes.func
};

function mapStateToProps(state) {
  return {
    constraintFilter: state.constraintFilter
  };
}

export const ConstraintFilterGroupContainer = connect(
  mapStateToProps,
  {
    onConstraintCheck
  }
)(ConstraintFilterGroup);
