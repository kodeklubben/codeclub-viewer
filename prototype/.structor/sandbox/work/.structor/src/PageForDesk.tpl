import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Test from '<%= componentRelativePath %>';

class PageForDesk extends Component{

    constructor(props, content) {
        super(props, content);
    }

    componentDidMount(){
        if(window.onPageDidMount){
            window.onPageDidMount();
        }
    }

    render () {
        return (
            <div className="preview-overlay-container">
                <div className="preview-overlay-adjuster">
                    <div className="preview-overlay-box">
                        <Test></Test>
                    </div>
                </div>
            </div>
        );
    }

}

export default PageForDesk;
