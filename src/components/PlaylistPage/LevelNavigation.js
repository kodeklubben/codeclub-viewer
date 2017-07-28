import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LevelNavigation.scss';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';


const LevelNavigation = ({t, levels}) => {
  const levelListItems = levels.map((level, idx) => (
    <ListGroupItem className={styles.listGroupItem}
                   key={idx}
                   onClick={() => document.getElementById('level-' + level).scrollIntoView()}>
      <LevelIcon level={level}/>{t('general.levels.' + level)}
    </ListGroupItem>
  ));
  const header = <span className={styles.header}>{t('playlist.levelnavigation')}</span>;
  return (
    <Panel header={<div>{header}</div>}>
      <ListGroup fill>
        {levelListItems}
      </ListGroup>
    </Panel>
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

export default connect(mapStateToProps)(withStyles(styles)(LevelNavigation));
