import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';

const MobileButtonsRow = React.createClass({
  render() {
    return (
      <Row>
        <Col xs={12} smHidden mdHidden lgHidden>
          <Button onClick={() => this.props.toggle('Filter')}>Vis/skjul filter
          </Button>

          <Button onClick={() => this.props.toggle('Playlists')}>Vis/skjul
            oppgavesamlinger
          </Button>

          {this.props.showLevelNavigation ?
            <Button onClick={() => this.props.toggle('LevelNavigation')}>
              Oppgavenavigasjon
            </Button> : null}
        </Col>
      </Row>
    );
  }
});

export default MobileButtonsRow;
