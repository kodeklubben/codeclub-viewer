import React, {PropTypes} from 'react';
import {getLevelName} from '../../util';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const LevelNavigation = React.createClass({
  render() {
    const levels = this.props.levels || [];
    const levelListItems = levels.map((level, idx) => (
      <ListGroupItem key={idx}>
        <a href={'#level-' + level}><LevelIcon level={level}/>{getLevelName(level)}</a>
      </ListGroupItem>
    ));
    return (
      <div>
        <h3>Hopp til</h3>
        <div style={{fontSize: '1.25em'}}>
          <ListGroup>
            {levelListItems}
          </ListGroup>
        </div>
      </div>
    );
  }
});

LevelNavigation.propTypes = {
  levels: PropTypes.array
};

export default LevelNavigation;
