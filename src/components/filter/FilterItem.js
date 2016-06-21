import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import capitalize from '../../util';


const FilterItem = React.createClass({
  getInitialState() {
    return {
      checked: false
    };
  },
  onCheck() {
    const checked = this.state.checked;
    this.setState({checked: !checked});
    this.props.onCheck(this.props.tag, !checked);
  },
  render(){
    const tag = capitalize(this.props.tag);
    return (
      <Checkbox
        label={tag}
        checked={this.state.checked}
        onCheck={this.onCheck}
      />
    );
  }
});

FilterItem.propTypes = {
  tag: PropTypes.string,
  onCheck: PropTypes.func
};

export default FilterItem;
