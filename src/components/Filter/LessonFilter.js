import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './LessonFilter.scss';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {getShowRadiobuttons, getShowFiltergroups} from '../../selectors/playlist';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import PopoverComponent from '../PopoverComponent';
import CollapsiblePanel from '../CollapsiblePanel';
import ClearFilterButton from './ClearFilterButton';

const LessonFilter = ({course}) => {
  useStyles(styles);

  const {filterGroupKeys, isStudentMode, t, showFiltergroups} = useSelector(state => ({
    filterGroupKeys: Object.keys(state.filter),
    isStudentMode: state.isStudentMode,
    t: getTranslator(state),
    showFiltergroups: getShowFiltergroups(state, course),
  }));

  const filterGroups = filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{t, groupKey}}/>);
  const header =
    <span>
      {t('filter.header')}
      <PopoverComponent popoverContent={t('filter.tooltip')}>
        <Button
          bsSize='xs'
          className={styles.popButton}
          aria-label={t('general.glyphicon', {title: t('filter.header')})}
        >
          <span className={styles.filterInfo}><Glyphicon glyph="info-sign"/></span>
        </Button>
      </PopoverComponent>
    </span>;
  const bsStyle = (isStudentMode ? 'student' : 'teacher');
  const showRadiobuttons = getShowRadiobuttons(course);
  const radioButtons = showRadiobuttons ? <RadioButtons/> : null;
  const groups = showFiltergroups ? filterGroups : null;
  return (
    <div>
      {/*Filter desktop*/}
      <Col xsHidden>
        <Panel {...{bsStyle}}>
          <Panel.Heading><Panel.Title>{header}</Panel.Title></Panel.Heading>
          <ListGroup>
            {radioButtons}
            {groups}
          </ListGroup>
        </Panel>
      </Col>
      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={true} {...{header, bsStyle}}>
          <ListGroup>
            {radioButtons}
            {groups}
          </ListGroup>
        </CollapsiblePanel>
      </Col>
      <ClearFilterButton/>
    </div>
  );
};

LessonFilter.propTypes = {
  course: PropTypes.string,
};

export default LessonFilter;
