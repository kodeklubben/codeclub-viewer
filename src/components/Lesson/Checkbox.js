/* eslint-env node */

import React, {PropTypes} from 'react';

const Checkbox = React.createClass({
  getInitialState() {
    return {
      checked: false
    };
  },

  render() {

    return (
      <div className="checkbox" style="margin-right: 20px">
        <input type="checkbox" name="vehicle" value={checked} />
      </div>
    );
  }
});

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    checked: state.isStudentMode
  };
}

export default Checkbox;
