import React, { Component, PropTypes } from 'react';

class MenuOverlay extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { menuItems, menuTitle, onTitleClick } = this.props;
        let boxStyle = {
            display: 'inline-block'
        };
        let items = [];
        if(menuItems && menuItems.length > 0){
            menuItems.forEach((item, index) => {
                items.push(
                    <div key={index}
                         className="selected-overlay-menu-item"
                         onClick={item.onClick}>
                        {item.label}
                    </div>
                )
            });
        }
        let content = (
            <div style={boxStyle}
                 className="selected-overlay-menu-box">
                <p className="selected-overlay-menu-title"
                   onClick={onTitleClick}>
                    <span className="selected-overlay-menu-title-close-button">&times;</span>
                    <span>{menuTitle}</span>
                </p>
                {items}
            </div>
        );
        return (
            <div {...this.props}>
                {content}
            </div>
        );
    }
}

export default MenuOverlay;
