import React, {PropTypes} from 'react';
import {LessonFilterContainer} from '../Filter/LessonFilter';
import LevelNavigation from '../LessonList/LevelNavigation';
import PlaylistNavigation from '../Playlist/PlaylistNavigation';
import MobileButtonsRow from './MobileButtonsRow';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Row from 'react-bootstrap/lib/Row';

const MobileComponents = React.createClass({
  getInitialState() {
    return {
      showFilter: false,
      showPlaylists: false
    };
  },
  toggle(componentName) {
    this.setState({['show'+componentName]: !this.state['show'+componentName]});
  },
  render() {
    return (
      <div>
        <MobileButtonsRow toggle={this.toggle} />

        <Row>
          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden xs={12}>

            <Collapse in={this.state.showFilter}>
              <div>
                <LessonFilterContainer/>
              </div>
            </Collapse>

            {/*Playlists mobile*/}
            <Collapse in={this.state.showPlaylists}>
              <div>
                <PlaylistNavigation playlists={this.props.playlists}/>
              </div>
            </Collapse>

            {/*Level navigation mobile*/}
            <div>
              {this.props.showLevelNavigation ? <LevelNavigation levels={this.props.levels}/> : null}
            </div>

          </Col>
        </Row>
      </div>
    );
  }
});

MobileComponents.propTypes = {
  showLevelNavigation: PropTypes.bool,
  levels: PropTypes.array,
  playlists: PropTypes.object
};

export default MobileComponents;
