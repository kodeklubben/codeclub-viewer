import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Col from 'react-bootstrap/lib/Col';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LevelNavigation.scss';
import CollapsiblePanel from '../CollapsiblePanel';

const LevelNavigation = ({t, levels, isStudentMode}) => {
  const levelListItems = levels.map((level, idx) => (
    <ListGroupItem key={idx} onClick={() => document.getElementById('level-' + level).scrollIntoView()}>
      <span className={styles.name}>
        <LevelIcon level={level}/>{t('general.levels.' + level)}
      </span>
    </ListGroupItem>
  ));
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  const header = t('playlist.levelnavigation');
  return (
    <div>
      <Col xsHidden>
        <Panel {...{bsStyle, header}}>
          <ListGroup fill>
            {levelListItems}
          </ListGroup>
        </Panel>
      </Col>
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={false} {...{bsStyle, header}}>
          <ListGroup fill>
            {levelListItems}
          </ListGroup>
        </CollapsiblePanel>
      </Col>
    </div>
  );
};

LevelNavigation.propTypes = {
  levels: PropTypes.array,
  t: PropTypes.func,
  isStudentMode: PropTypes.bool
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  isStudentMode: state.isStudentMode
});

export default connect(mapStateToProps)(withStyles(styles)(LevelNavigation));
