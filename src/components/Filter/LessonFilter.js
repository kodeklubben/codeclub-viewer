import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonFilter.scss';
import Panel from 'react-bootstrap/lib/Panel';
import {getAvailableLessons} from '../../selectors/lesson';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import CollapsiblePanel from '../CollapsiblePanel';
import Col from 'react-bootstrap/lib/Col';

const LessonFilter = ({filterGroupKeys, isStudentMode, availableLessons, t}) => {
  const filterGroups = filterGroupKeys.map(groupKey =>
    <FilterGroup key={groupKey} availableLessonsForTag={availableLessons} {...{t, groupKey}}/>);
  const tooltip =
    <Tooltip id="filterhelp">
      <p>{t('filter.tooltip.textline1')}</p>
      <p>{t('filter.tooltip.textline2')}</p>
    </Tooltip>;
  const header =
    <span>
      {t('filter.header')}
      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={tooltip}
                      onClick={(e) => e.stopPropagation()}>
        <span className={styles.filterInfo}><Glyphicon glyph="info-sign"/></span>
      </OverlayTrigger>
    </span>;
  const bsStyle = (isStudentMode ? 'student' : 'teacher');
  return (
    <div>
      {/*Filter desktop*/}
      <Col xsHidden>
        <Panel {...{header, bsStyle}}>
          <ListGroup fill>
            {filterGroups}
          </ListGroup>
        </Panel>
      </Col>
      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={false} {...{header, bsStyle}}>
          <ListGroup fill>
            {filterGroups}
          </ListGroup>
        </CollapsiblePanel>
      </Col>
    </div>
  );
};

LessonFilter.propTypes = {
  // mapStateToProps
  filterGroupKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  availableLessons: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {courseName}) => ({
  filterGroupKeys: Object.keys(state.filter),
  isStudentMode: state.isStudentMode,
  availableLessons: getAvailableLessons(state, courseName),
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonFilter));
