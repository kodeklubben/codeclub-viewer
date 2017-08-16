import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';
import {LessonItemContainer} from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';

const PlaylistNavigation = ({t, playlists, language}) => {
  const playlistsObject = playlists || {};
  const playlistListItems = Object.keys(playlistsObject).map((name, idx) => {
    const header = <h4 role="presentation">
      <Badge pullRight>{playlistsObject[name].length}</Badge>
      <span className={styles.link}>{name}</span>
    </h4>;
    return playlistsObject[name].length ? <Panel key={name} {...{header}} eventKey={idx}>
      <ListGroup fill>
        {
          playlistsObject[name].map(lesson => {
            return <LessonItemContainer key={lesson.path} {...{lesson}}/>;
          })
        }
      </ListGroup>
    </Panel> : null;
  });

  if(playlistListItems.length) {
    return language === 'nb' ?
    <div className={styles.container}>
      <h3>{t('playlist.lessoncollections')}</h3>
      <Accordion>
        {playlistListItems}
      </Accordion>
    </div>
    :
    null;
  }
};

PlaylistNavigation.propTypes = {
  // ownProps
  playLists: PropTypes.object,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  language: state.language
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistNavigation));
