import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { forOwn, isObject, isString, extend, difference, keys, isEqual } from 'lodash';
import components from './index.js';

class PageForDesk extends Component{

    constructor(props, content) {
        super(props, content);
        this.bindGetPageModel = this.bindGetPageModel.bind(this);
    }

    componentWillMount(){
        console.log('PageForDesk in sandbox is mounted');
        if(window.onPageWillMount){
            console.log('PageForDesk callback is invoked');
            window.onPageWillMount(this);
        } else {
            console.log('PageForDesk window does not have onPageDidMount');
        }
    }

    bindGetPageModel(func){
        this.getPageModel = func;
    }

    findComponent(index, componentName, level){
        let result = null;
        if(index && isObject(index) && level <= 1){
            level++;
            forOwn(index, (value, key) => {
                if(!result){
                    if(key === componentName){
                        result = value;
                    } else if(value && isObject(value)){
                        result = this.findComponent(value, componentName, level);
                    }
                }
            });
        }
        return result;
    }

    createPreviewElement(node){
        if(node && node.modelNode){
            let type = 'div';
            let modelNode = node.modelNode;
            if(modelNode.type){
                type = this.findComponent(components, modelNode.type, 0);
                if(!type){
                    type = modelNode.type;
                } else if(!isObject(type)){
                    console.error('Element type: ' + modelNode.type + ' is not object. Please check sandbox index.js file');
                    type = 'div';
                }
            }
            let props = Object.assign({}, modelNode.props);
            if(node.props){
                forOwn(node.props, (prop, propName) => {
                    props[propName] = this.createPreviewElement(prop);
                });
            }
            let nestedElements = null;
            if(node.children && node.children.length > 0){
                let children = [];
                node.children.forEach(node => {
                    children.push(this.createPreviewElement(node));
                });
                nestedElements = children;
            } else if(modelNode.text) {
                nestedElements = [modelNode.text];
            }
            return React.createElement(type, props, nestedElements);
        } else {
            return null;
        }
    }

    render () {
        return (
            <div className="preview-overlay-container">
                <div className="preview-overlay-adjuster">
                    <div className="preview-overlay-box">
                        {this.createPreviewElement(this.getPageModel())}
                    </div>
                </div>
            </div>
        );
    }

}

export default PageForDesk;
