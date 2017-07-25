import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import {setCollapsedFilter} from '../../action_creators';
import {getTranslator} from '../../selectors/translate';
import FilterLabels from '../Filter/FilterLabels';
import LessonFilter from '../Filter/LessonFilter';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Filter.scss';

const Filter = ({isStudentMode, courseName, t, setCollapsedFilter, collapsedFilter}) => {
  return (
    <div>
      {/*Filter desktop*/}
      <Col xsHidden>
        <LessonFilter courseName={courseName}/>
      </Col>

      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <FilterLabels t={t}/>
        <Button className={isStudentMode ? 'btn-student' : 'btn-teacher'}
          onClick={() => setCollapsedFilter()}>
          <Glyphicon className={styles.glyph} glyph={collapsedFilter ? 'chevron-down' : 'chevron-right'}/>
          {t('frontpage.showhidefilter')}
        </Button>
        <br/>

        <br/>
        <Collapse in={collapsedFilter}>
          <div>
            <LessonFilter courseName={courseName}/>
          </div>
        </Collapse>
      </Col>
    </div>
  );
};


Filter.propTypes = {
  // ownProps:
  isStudentMode: PropTypes.bool,
  courseName: PropTypes.string,

  // mapStateToProps:
  t: PropTypes.func,
  collapsedFilter: PropTypes.bool,
  setCollapsedFilter: PropTypes.func
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  collapsedFilter: state.collapsedFilter
});

export default connect(
  mapStateToProps,
  {setCollapsedFilter}
)(withStyles(styles)(Filter));
