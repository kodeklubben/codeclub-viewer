
import React, { Component, PropTypes } from 'react';

import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class HomePage extends Component {

    render() {
        return (
            <div>
                <h3 style={ { padding: '1em', textAlign: 'center', backgroundColor: '#CFC' } }
                    params={ this.props.params }
                    location={ this.props.location }><span params={ this.props.params } location={ this.props.location }>Kodeklubben</span></h3>
                <ButtonGroup style={ {  } }
                             params={ this.props.params }
                             location={ this.props.location }>
                    <Button style={ { backgroundColor: '#FAA' } }
                            params={ this.props.params }
                            location={ this.props.location }>
                        <span params={ this.props.params } location={ this.props.location }>Lær å kode her!</span>
                    </Button>
                    <Button style={ { backgroundColor: '#AFA' } }
                            params={ this.props.params }
                            location={ this.props.location }>
                        <span params={ this.props.params } location={ this.props.location }>Jeg skal undervise</span>
                    </Button>
                </ButtonGroup>
            </div>
            );
    }
}

export default HomePage;

