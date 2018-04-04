import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonFilter.scss';
import Panel from 'react-bootstrap/lib/Panel';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import CollapsiblePanel from '../CollapsiblePanel';
import Col from 'react-bootstrap/lib/Col';
import ClearFilterButton from './ClearFilterButton';

const LessonFilter = ({filterGroupKeys, isStudentMode, t, playlists}) => {
  const filterGroups = filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{t, groupKey}}/>);
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
            <RadioButtons/>
            {playlists ? null : filterGroups}
          </ListGroup>
        </Panel>
      </Col>
      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={false} {...{header, bsStyle}}>
          <ListGroup fill>
            <RadioButtons/>
            {playlists ? null : filterGroups}
          </ListGroup>
        </CollapsiblePanel>
      </Col>
      <ClearFilterButton/>
    </div>
  );
};

LessonFilter.propTypes = {
  // mapStateToProps
  filterGroupKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  playlists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {courseName}) => ({
  filterGroupKeys: Object.keys(state.filter),
  isStudentMode: state.isStudentMode,
  t: getTranslator(state),
  playlists: state.playlists,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonFilter));
