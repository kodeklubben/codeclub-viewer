import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import MenuOverlay from './MenuOverlay.js';
import QuickAddNewOverlay from './QuickAddNewOverlay.js';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';
const borderStyle = 'solid #35b3ee';
const borderSize = '2px';

function isVisible(element) {
    let invisibleParent = false;
    if ($(element).css("display") === "none") {
        invisibleParent = true;
    } else {
        $(element).parents().each(function (i, el) {
            if ($(el).css("display") === "none") {
                invisibleParent = true;
                return false;
            }
            return true;
        });
    }
    return !invisibleParent;
}

const QUICK_ADD_NEW_MENU = 1;
const QUICK_ADD_NEW_PANEL = 2;
const SELECTION_MENU = 3;
const CLIPBOARD_MENU = 4;

export const ADD_BEFORE = 1;
export const INSERT_FIRST = 2;
export const INSERT_LAST = 3;
export const ADD_AFTER = 4;
export const REPLACE = 5;
export const REPLACE_WRAP = 6;
export const WRAP = 7;

class SelectedOverlay extends Component {

    constructor(props) {
        super(props);
        this.isSubscribed = false;
        this.state = {
            newPos: null,
            border: '' + (props.bSize ? props.bSize : borderSize) + ' ' + (props.bStyle ? props.bStyle : borderStyle),
            contextMenuType: null,
            contextMenuItem: null
        };
        this.startRefreshTimer = this.startRefreshTimer.bind(this);
        this.refreshPosition = this.refreshPosition.bind(this);
        this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
        this.setSelectedPosition = this.setSelectedPosition.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        this.bodyWidth = document.body.clientWidth;
        this.bodyHeight = document.body.clientHeight;
        this.subscribeToInitialState();
    }

    componentWillUnmount(){
        if(this.refreshTimerId){
            clearTimeout((this.refreshTimerId));
            this.refreshTimerId = undefined;
        }
        this.$DOMNode = undefined;
    }

    componentDidUpdate(){
        this.subscribeToInitialState();
    }

    componentWillReceiveProps(nextProps){
        this.isSubscribed = false;
    }

    subscribeToInitialState(){
        if(!this.isSubscribed){
            const { selectedKey, initialState } = this.props;
            if(selectedKey && initialState){
                const element = initialState.elements[selectedKey];
                if(element){
                    const targetDOMNode = element.getDOMNode();
                    this.isSubscribed = true;
                    this.setSelectedPosition({targetDOMNode});
                } else {
                    this.resetTimer();
                    this.setState({newPos: null});
                }
            }
            this.isSubscribed = true;
        }
    }

    startRefreshTimer(){
        this.refreshTimerId = setTimeout(() => {
            this.refreshPosition();
        }, 500);
    }

    refreshPosition(){
        const $DOMNode = this.$DOMNode;
        if($DOMNode){
            const { newPos: oldPos } = this.state;
            if(isVisible($DOMNode)){
                let pos = $DOMNode.offset();
                let newPos = {
                    top: pos.top,
                    left: pos.left,
                    width: $DOMNode.outerWidth(),
                    height: $DOMNode.outerHeight()
                };
                if(!oldPos ||
                    newPos.top !== oldPos.top ||
                    newPos.left !== oldPos.left ||
                    newPos.width !== oldPos.width ||
                    newPos.height !== oldPos.height){
                    this.setState({newPos});
                }
            } else {
                if(oldPos){
                    this.setState({newPos: null});
                }
            }
        }
        this.startRefreshTimer();
    }

    resetTimer(){
        if(this.refreshTimerId){
            clearTimeout((this.refreshTimerId));
            this.refreshTimerId = undefined;
        }
        this.$DOMNode = undefined;
    }

    setSelectedPosition(options){
        let targetDOMNode = options.targetDOMNode;
        this.resetTimer();
        if(targetDOMNode){
            this.$DOMNode = $(targetDOMNode);
            this.refreshPosition();
        } else {
            console.error('')
        }
    }

    handleButtonClick(selectedKey, func, e){
        e.preventDefault();
        e.stopPropagation();
        if(func){
            func(selectedKey, e.metaKey || e.ctrlKey)
        }
    }

    render(){
        const {newPos, border, contextMenuType, contextMenuItem } = this.state;
        const { selectedKey, initialState: {onLoadOptions, isMultipleSelection} } = this.props;
        const isMultiple = isMultipleSelection();
        let content;
        if(newPos){
            const endPoint = {
                top: newPos.top + px,
                left: newPos.left + px,
                width: '1px',
                height: '1px',
                position: position,
                zIndex: contextMenuType ? 1050 : 1035
            };
            const topLine = {
                top: nullPx,
                left: nullPx,
                width: (newPos.width - 1) + 'px',
                height: nullPx,
                position: position,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                borderTop: border
            };
            const leftLine = {
                top: nullPx,
                left: nullPx,
                width: nullPx,
                height: (newPos.height - 1) + px,
                position: position,
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
                borderLeft: border
            };
            const bottomLine = {
                bottom: '-' + (newPos.height - 1) + px,
                left: nullPx,
                width: (newPos.width - 1) + px,
                height: nullPx,
                position: position,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                borderBottom: border
            };
            const rightLine = {
                right: '-' + (newPos.width - 1) + px,
                top: nullPx,
                width: nullPx,
                height: newPos.height + px,
                position: position,
                borderTopRightRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                borderRight: border
            };
            let buttonLine;
            let menuBox;
            let menuTitle;
            let menuSubTitle;
            let menuItems;
            let componentsList = [];
            let quickAction = undefined;
            if(!isMultiple){
                buttonLine = {
                    display: 'flex',
                    flexDirection: 'row',
                    position: position
                };
                if ((newPos.left + 400) < this.bodyWidth) {
                    buttonLine.left = nullPx;
                } else {
                    buttonLine.right = '-' + (newPos.width - 1) + px;
                    buttonLine.minWidth = newPos.width + px;
                }
                if (newPos.top < 50) {
                    buttonLine.bottom = 'calc(-' + (newPos.height - 1) + px + ' - 1em)';
                } else {
                    buttonLine.top = '-1em';
                }
                if(contextMenuType){
                    menuBox = {
                        position: position
                    };
                    if ((newPos.left + 400) < this.bodyWidth) {
                        menuBox.left = nullPx;
                    } else {
                        menuBox.right = '-' + (newPos.width - 1) + px;
                        menuBox.minWidth = newPos.width + px;
                    }
                    if (newPos.top < 50) {
                        menuBox.top = 'calc(' + (newPos.height + 1) + px + ' - 1em)';
                    } else if(this.bodyHeight > 200 && (newPos.top + 200) > this.bodyHeight){
                        menuBox.bottom = 'calc(-' + (newPos.height - 1) + px + ' - 1em)'
                    } else {
                        menuBox.top = '-1em';
                    }
                    if(contextMenuType === QUICK_ADD_NEW_MENU){
                        menuTitle = 'New component';
                        menuItems = [];
                        menuItems.push({
                            onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: ADD_BEFORE});},
                            label: 'Before'
                        });
                        menuItems.push({
                            onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: INSERT_FIRST});},
                            label: 'First'
                        });
                        menuItems.push({
                            onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: INSERT_LAST});},
                            label: 'Last'
                        });
                        menuItems.push({
                            onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: ADD_AFTER});},
                            label: 'After'
                        });
                        menuItems.push({
                            onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: REPLACE});},
                            label: 'Replace'
                        });
                        //menuItems.push({
                        //    onClick: () => {this.setState({contextMenuType: QUICK_ADD_NEW_PANEL, contextMenuItem: WRAP});},
                        //    label: 'Wrap'
                        //});

                    } else if(contextMenuType === QUICK_ADD_NEW_PANEL){
                        const { initialState: {getComponentsList} } = this.props;
                        componentsList = getComponentsList();
                        if(contextMenuItem === ADD_BEFORE){
                            quickAction = this.props.initialState.quickBefore;
                            menuTitle = 'Before selected';
                        } else if(contextMenuItem === INSERT_FIRST){
                            quickAction = this.props.initialState.quickFirst;
                            menuTitle = 'As first child';
                        } else if(contextMenuItem === INSERT_LAST){
                            quickAction = this.props.initialState.quickLast;
                            menuTitle = 'As last child';
                        } else if(contextMenuItem === ADD_AFTER){
                            quickAction = this.props.initialState.quickAfter;
                            menuTitle = 'After selected';
                        } else if(contextMenuItem === REPLACE){
                            quickAction = this.props.initialState.quickReplace;
                            menuTitle = 'Replace selected';
                        }
                        //else if(contextMenuItem === WRAP){
                        //    quickAction = this.props.initialState.quickWrap;
                        //    menuTitle = 'Wrap selected';
                        //}
                        menuSubTitle = 'Escape to close';
                    } else if(contextMenuType === SELECTION_MENU){
                        const { initialState: {onCopy, onCut, onClone, onDelete} } = this.props;
                        menuTitle = 'Selected component';
                        menuItems = [];
                        menuItems.push({
                            onClick: (e) => this.handleButtonClick(selectedKey, onCopy, e),
                            label: 'Copy'
                        });
                        menuItems.push({
                            onClick: (e) => this.handleButtonClick(selectedKey, onCut, e),
                            label: 'Cut'
                        });
                        menuItems.push({
                            onClick: (e) => this.handleButtonClick(selectedKey, onClone, e),
                            label: 'Clone'
                        });
                        menuItems.push({
                            onClick: (e) => this.handleButtonClick(selectedKey, onDelete, e),
                            label: 'Delete'
                        });
                    } else if(contextMenuType === CLIPBOARD_MENU){
                        const { initialState: {isAvailableToPaste, isClipboardEmpty} } = this.props;
                        menuItems = [];
                        if(!isAvailableToPaste(selectedKey)){
                            menuTitle = 'Paste operation is not available';
                        } else if(!isClipboardEmpty()){
                            const { initialState: {onBefore, onFirst, onLast, onAfter, onReplace} } = this.props;
                            menuTitle = 'Paste from clipboard';
                            menuItems.push({
                                onClick: (e) => this.handleButtonClick(selectedKey, onBefore, e),
                                label: 'Before'
                            });
                            menuItems.push({
                                onClick: (e) => this.handleButtonClick(selectedKey, onFirst, e),
                                label: 'First'
                            });
                            menuItems.push({
                                onClick: (e) => this.handleButtonClick(selectedKey, onLast, e),
                                label: 'Last'
                            });
                            menuItems.push({
                                onClick: (e) => this.handleButtonClick(selectedKey, onAfter, e),
                                label: 'After'
                            });
                            menuItems.push({
                                onClick: (e) => this.handleButtonClick(selectedKey, onReplace, e),
                                label: 'Replace'
                            });
                            //if(isAvailableToWrap(selectedKey)){
                            //    menuItems.push({
                            //        onClick: (e) => this.handleButtonClick(selectedKey, onWrap, e),
                            //        label: 'Wrap'
                            //    });
                            //}
                        } else {
                            menuTitle = 'Clipboard is empty';
                        }
                    }
                }
            }
            const firstButtonClassName = 'selected-overlay-button selected-overlay-button-quick-add-new';
            const secondButtonClassName = 'selected-overlay-button selected-overlay-button-edit';
            const thirdButtonClassName = 'selected-overlay-button selected-overlay-button-copy-paste';
            const fourthButtonClassName = 'selected-overlay-button selected-overlay-button-before-after';
            content = (
                <div style={endPoint}>
                    <div style={topLine}></div>
                    <div style={leftLine}></div>
                    <div style={bottomLine}></div>
                    <div style={rightLine}></div>
                    {!isMultiple ?
                        <div style={buttonLine}>
                            <div className={firstButtonClassName}
                                 onClick={() => {this.setState({contextMenuType: QUICK_ADD_NEW_MENU});}}></div>
                            <div className={secondButtonClassName}
                                 onClick={(e) => this.handleButtonClick(selectedKey, onLoadOptions, e)}></div>
                            <div className={thirdButtonClassName}
                                 onClick={() => {this.setState({contextMenuType: SELECTION_MENU});}}></div>
                            <div className={fourthButtonClassName}
                                 onClick={() => {this.setState({contextMenuType: CLIPBOARD_MENU});}}></div>
                        </div> : null
                    }
                    {contextMenuType === QUICK_ADD_NEW_MENU || contextMenuType === SELECTION_MENU || contextMenuType === CLIPBOARD_MENU ?
                        <MenuOverlay style={menuBox}
                                     menuTitle={menuTitle}
                                     onTitleClick={() => {this.setState({contextMenuType: null, contextMenuItem: null});}}
                                     onMouseLeave={() => {this.setState({contextMenuType: null, contextMenuItem: null});}}
                                     menuItems={menuItems}
                            /> : null
                    }
                    {contextMenuType === QUICK_ADD_NEW_PANEL ?
                        <QuickAddNewOverlay style={menuBox}
                                            menuTitle={menuTitle}
                                            menuSubTitle={menuSubTitle}
                                            componentsList={componentsList}
                                            selectedKey={selectedKey}
                                            quickAction={quickAction}
                                            onClose={() => {this.setState({contextMenuType: null, contextMenuItem: null});}}
                            /> : null
                    }
                </div>
            );
        } else {
            const style = {
                display: 'none'
            };
            content = (<span style={style}></span>);
        }
        return content;
    }

}

export default SelectedOverlay;
