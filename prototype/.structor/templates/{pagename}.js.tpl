<%
    function processChild(model){
        var result = '<' + model.type + ' ' + processProps(model.props) + ' params={this.props.params} location={this.props.location}>';
        if(model.children && model.children.length > 0) {
            _.forEach(model.children, function(child) {
                result += processChild(child);
            });
        } else if(model.text && model.text.length > 0){
            result += model.text;
        }
        result += '</' + model.type + '>';
        return result;
    }

    function processStyle(styleObject){
        var result = '';
        if(styleObject && !_.isEmpty(styleObject)){
            _.forOwn(styleObject, function(value, prop){
                if(_.isString(value) && value.length > 0){
                    result += ' ' + prop + ": '" + value + "',";
                } else if(_.isBoolean(value) || _.isNumber(value)){
                    result += ' ' + prop + ": " + value + ",";
                }
            });
            result = result.substr(0, result.length - 1);
        }
        return result;
    }

    function processProps(props){

        var result = '';
        if(props && !_.isEmpty(props)){
            _.forOwn(props, function(value, prop){
                if(_.isString(value) && value.length > 0){
                    result += prop + "=\"" + value + "\"";
                } else if(_.isBoolean(value) || _.isNumber(value)){
                    result += prop + "={" + value + "} ";
                } else if(_.isArray(value)){
                    var arrayString = '';
                    _.forEach(value, function(item){
                        if(_.isObject(item)){
                            arrayString += '{ ' + processStyle(item) + ' },';
                        } else {
                            if(_.isString(item) && item.length > 0){
                                arrayString += "\'" + item + "\',";
                            } else if(_.isBoolean(item) || _.isNumber(item)){
                                arrayString += item + ',';
                            }
                        }
                    });
                    result += prop + '={[ ' + arrayString.substr(0, arrayString.length - 1) + ']}';
                } else if(_.isObject(value)){
                    if(value['type']){
                        result += prop +"={ " + processChild(value) + " }";
                    } else {
                        result += prop + "={{ " + processStyle(value) + " }} ";
                    }
                }
            });
        }
        return result;
    }

%>
import React, { Component, PropTypes } from 'react';
<% _.forEach(imports, function(item, index) { %><%= '\n' %><% if(item.member){ %>import { <%= item.member %> } from '<%= item.relativeSource %>';<% } else {%>import <%= item.name %> from '<%= item.relativeSource %>';<% } %><% }); %>


class <%= pageName %> extends Component {

    render(){
        return (
        <div>
            <% if(model.children && model.children.length > 0) {
                    _.forEach(model.children, function(child) { %>
                        <%= processChild(child) %>
                    <% });
            } %>
        </div>
        );
    }
}

export default <%= pageName %>;

