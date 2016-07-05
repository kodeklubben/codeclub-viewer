import React, {PropTypes} from 'react';
import {getLevelName} from '../../util';

const LevelNavigation = React.createClass({
  render() {
    const levels = this.props.levels || [];
    const levelListItems = levels.map((level, idx) => (
      <li key={idx} className='list-group-item'><a href={'#level-'+level}>{level + '. ' + getLevelName(level)}</a>
      </li>
    ));
    return (
      <div>
        <h3>Hopp til</h3>
        <ul className='list-group'>
          {levelListItems}
        </ul>
      </div>
    );
  }
});

LevelNavigation.propTypes = {
  levels: PropTypes.array
};

export default LevelNavigation;
