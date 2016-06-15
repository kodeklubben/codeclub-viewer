import React, { Component, PropTypes } from 'react';
import { ADD_BEFORE, ADD_AFTER, } from './SelectedOverlay.js';

class QuickAddNewOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: ''
        };
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount(){
        //this.refs.inputElement.addEventListener('change', ((inputElm) => () => {
        //    let optionFound = false;
        //    let datalist = inputElm.list;
        //    for (let j = 0; j < datalist.options.length; j++) {
        //        if (inputElm.value == datalist.options[j].value) {
        //            optionFound = true;
        //            break;
        //        }
        //    }
        //    if (optionFound) {
        //        inputElm.setCustomValidity('');
        //    } else {
        //        inputElm.setCustomValidity('Type full component name.');
        //    }
        //})(this.refs.inputElement));
        this.refs.inputElement.focus();
    }

    handleOnKeyDown(e){
        if(e.keyCode == 27){
            this.props.onClose();
        }
        e.stopPropagation();
    }

    handleOnSubmit(e){
        e.stopPropagation();
        e.preventDefault();
        const {quickAction, selectedKey, componentsList} = this.props;
        const inputValue = this.refs.inputElement.value;
        if(componentsList){
            if(componentsList.indexOf(inputValue) >= 0){
                if(quickAction && selectedKey){
                    quickAction(inputValue, selectedKey);
                }
            } else {
                this.setState({
                    alert: 'Type a full name of component or select it from from the dropdown list'
                });
            }
        }
    }

    render() {
        const { componentsList, menuTitle, menuSubTitle, onClose } = this.props;
        const { alert } = this.state;
        let componentNames = [];
        if(componentsList && componentsList.length > 0){
            componentsList.forEach((name, index) => {
                componentNames.push(
                    <option key={index}>{name}</option>
                )
            });
        }
        let boxStyle = {
            display: 'inline-block'
        };
        let content = (
            <div style={boxStyle} className="selected-overlay-quick-add-panel">
                <div className="selected-overlay-quick-add-close-button"
                     onClick={() => {onClose();}}>&times;</div>
                {alert ? <span style={{color: 'red'}}>{alert}</span> : null}
                <form onSubmit={this.handleOnSubmit}>
                    <span style={{color: '#9a9a9a'}}>{menuTitle}</span>
                    <input ref="inputElement"
                           type="text"
                           autoComplete="on"
                           list="components"
                           onKeyDown={this.handleOnKeyDown}
                           className="selected-overlay-quick-add-input" />
                    <span style={{color: '#9a9a9a'}}>{menuSubTitle}</span>
                    <datalist id="components">
                        {componentNames}
                    </datalist>
                </form>
            </div>
        );
        return (
            <div {...this.props}>
                {content}
            </div>
        );
    }
}

export default QuickAddNewOverlay;
