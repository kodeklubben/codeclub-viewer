import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getLevelName} from '../../util';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const LevelNavigation = React.createClass({
  render() {
    const {t} = this.props;
    const levels = this.props.levels || [];
    const levelListItems = levels.map((level, idx) => (
      <ListGroupItem key={idx}>
        <a href={'#level-' + level}><LevelIcon level={level}/>{getLevelName(level)}</a>
      </ListGroupItem>
    ));
    return (
      <div>
        <h3>{t('playlist.levelnavigation')}</h3>
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
  levels: PropTypes.array,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  }
}

export default connect(mapStateToProps)(LevelNavigation);
