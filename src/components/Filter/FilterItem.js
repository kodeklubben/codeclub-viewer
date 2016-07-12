import React, {PropTypes} from 'react';
import {capitalize} from '../../util';


const FilterItem = React.createClass({
  render(){
    const name = capitalize(this.props.name);
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
                 checked={this.props.checked}
                 onChange={this.props.onCheck}
          />
          {name}
        </label>
      </div>
    );
  }
});

FilterItem.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onCheck: PropTypes.func
};

export default FilterItem;
