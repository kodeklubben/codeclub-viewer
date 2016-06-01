import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';
const borderStyle = 'solid #35b3ee';
const borderSize = '2px';

class MouseOverOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPos: null,
            border: '' + (props.bSize ? props.bSize : borderSize) + ' ' + (props.bStyle ? props.bStyle : borderStyle)
        };
        this.refreshPosition = this.refreshPosition.bind(this);
        this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
    }

    componentDidMount() {
        this.subscribeToInitialState();
    }

    componentWillUnmount(){
        this.$DOMNode = undefined;
    }

    componentDidUpdate(){
        this.subscribeToInitialState();
    }

    subscribeToInitialState(){
        const { initialState } = this.props;
        if(initialState){
            initialState.onMouseOver = (options) => {
                this.updatePosition(options)
            };
            initialState.onMouseOut = (options) => {
                this.updatePosition(options)
            };
        }
    }

    refreshPosition(position){
        const $DOMNode = this.$DOMNode;
        if($DOMNode){
            const pos = position;
            const newPos = {
                label: pos.label,
                top: pos.top,
                left: pos.left,
                width: $DOMNode.outerWidth(),
                height: $DOMNode.outerHeight()
            };
            const { newPos: oldPos } = this.state;
            if(!oldPos ||
                newPos.top !== oldPos.top ||
                newPos.left !== oldPos.left ||
                newPos.width !== oldPos.width ||
                newPos.height !== oldPos.height){
                this.setState({newPos});
            }
        }
    }

    resetPosition(){
        this.$DOMNode = undefined;
        this.setState({newPos: null});
    }

    updatePosition(options){
        let targetDOMNode = options.targetDOMNode;

        if (options.remove) {
            this.resetPosition();
            this.lastPosition = undefined;
        } else {
            if (targetDOMNode) {
                const $targetDOMNode = $(targetDOMNode);
                const pos = $targetDOMNode.offset();
                const newPos = {
                    top: pos.top,
                    left: pos.left,
                    label: options.type
                };
                if (this.$DOMNode && this.lastPosition) {
                    if((newPos.top === this.lastPosition.top && newPos.left > this.lastPosition.left)
                        || (newPos.top > this.lastPosition.top && newPos.left === this.lastPosition.left)
                        || (newPos.top > this.lastPosition.top && newPos.left > this.lastPosition.left)){
                        this.$DOMNode = $targetDOMNode;
                        this.lastPosition = newPos;
                    }
                } else {
                    this.$DOMNode = $(targetDOMNode);
                    this.lastPosition = newPos;
                }
                this.refreshPosition(this.lastPosition);
            }
        }
    }

    render(){
        const {newPos, border} = this.state;
        let content;
        if(newPos){
            const endPoint = {
                top: newPos.top + px,
                left: newPos.left + px,
                width: '1px',
                height: '1px',
                position: position,
                zIndex: 1040
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
            let labelLine = {
                left: nullPx,
                position: position
            };
            if(newPos.top < 50){
                labelLine.bottom = 'calc(-' + (newPos.height - 1) + px + ' - 1em)';
            } else {
                labelLine.top = '-1em';
            }
            content = (
                <div style={endPoint}>
                    <div style={topLine}></div>
                    <div style={leftLine}></div>
                    <div style={bottomLine}></div>
                    <div style={rightLine}></div>
                    <span className="mouse-overlay-label" style={labelLine}>{newPos.label}</span>
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

export default MouseOverOverlay;
