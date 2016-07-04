import React, {PropTypes} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import LessonFilter from '../Filter/LessonFilter';
import LevelNavigation from '../LessonList/LevelNavigation';
import PlaylistNavigation from '../Playlist/PlaylistNavigation';
import MobileButtonsRow from './MobileButtonsRow';

const MobileComponents = React.createClass({
  getInitialState() {
    return {
      showFilter: false,
      showPlaylists: false,
      showLevelNavigation: false
    };
  },
  toggle(componentName) {
    this.setState({['show'+componentName]: !this.state['show'+componentName]});
  },
  render() {
    return (
      <div>
        <MobileButtonsRow showLevelNavigation={this.props.showLevelNavigation} toggle={this.toggle} />

        <Row>
          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden xs={12}>
            <Collapse in={this.state.showFilter}>
              <div>
                <LessonFilter filter={this.props.filter} onFilterCheck={this.props.onFilterCheck}/>
              </div>
            </Collapse>

            {/*Level navigation mobile*/}
            <Collapse in={this.state.showLevelNavigation}>
              <div>
                {this.props.showLevelNavigation ? <LevelNavigation levels={this.props.levels}/> : null}
              </div>
            </Collapse>

            {/*Playlists mobile*/}
            <Collapse in={this.state.showPlaylists}>
              <div>
                <PlaylistNavigation playlists={this.props.playlists}/>
              </div>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
});

MobileComponents.propTypes = {
  showFilter: PropTypes.bool,
  showLevelNavigation: PropTypes.bool,
  showPlaylists: PropTypes.bool,
  levels: PropTypes.array,
  playlists: PropTypes.object,
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

export default MobileComponents;
