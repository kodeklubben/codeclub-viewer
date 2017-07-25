import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const LevelNavigation = ({t, levels}) => {
  const levelListItems = levels.map((level, idx) => (
    <ListGroupItem key={idx} onClick={() => document.getElementById('level-' + level).scrollIntoView()}>
      <LevelIcon level={level}/>{t('general.levels.' + level)}
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
};


LevelNavigation.propTypes = {
  levels: PropTypes.array,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  };
}

export default connect(mapStateToProps)(LevelNavigation);
