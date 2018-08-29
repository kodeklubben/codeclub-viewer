import React from 'react';
import PropTypes from 'prop-types';
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
import scrollToComponent from 'react-scroll-to-component';
import {lessonListId} from './LessonList';

class LevelNavigation extends React.PureComponent {
  handleClick = level => scrollToComponent(document.getElementById(lessonListId(level)), {align: 'top'});

  render() {
    const {t, levels, isStudentMode} = this.props;
    const levelListItems = levels.map(level => (
      <ListGroupItem key={level} onClick={() => this.handleClick(level)}>
        <span className={styles.name}>
          <LevelIcon {...{level}}/>{t('general.levels.' + level)}
        </span>
      </ListGroupItem>
    ));
    const bsStyle = isStudentMode ? 'student' : 'teacher';
    const header = t('coursepage.levelnavigation');
    return (
      <div>
        <Col xsHidden>
          <Panel {...{bsStyle}}>
            <Panel.Heading><Panel.Title>{header}</Panel.Title></Panel.Heading>
            <ListGroup>
              {levelListItems}
            </ListGroup>
          </Panel>
        </Col>
        <Col smHidden mdHidden lgHidden>
          <CollapsiblePanel initiallyExpanded={false} {...{bsStyle, header}}>
            <ListGroup>
              {levelListItems}
            </ListGroup>
          </CollapsiblePanel>
        </Col>
      </div>
    );
  }
}

LevelNavigation.propTypes = {
  // ownProps
  levels: PropTypes.array,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LevelNavigation));
