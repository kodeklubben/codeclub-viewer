import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class PreviewOverlay extends Component{

    constructor(props, content) {
        super(props, content);
        this.handleViewVariant = this.handleViewVariant.bind(this);
        this.handleSelectVariant = this.handleSelectVariant.bind(this);
        this.handleHidePreview = this.handleHidePreview.bind(this);
    }

    handleViewVariant(e) {
        e.stopPropagation();
        e.preventDefault();
        const {initialState, componentInPreview} = this.props;
        if(initialState){
            initialState.setDefaultVariant(componentInPreview, e.currentTarget.dataset.key);
        }
    }

    handleHidePreview(e){
        e.stopPropagation();
        e.preventDefault();
        const {initialState} = this.props;
        if(initialState){
            initialState.hidePreview();
        }
    }

    handleSelectVariant(e){
        e.stopPropagation();
        e.preventDefault();
        const {initialState, defaultVariantKey} = this.props;
        if(initialState){
            initialState.selectVariant(defaultVariantKey);
        }
    }

    render () {

        const {variantsInPreview, defaultVariantKey} = this.props;
        let variantButtons = [];
        if(variantsInPreview && variantsInPreview.length > 0){
            variantsInPreview.forEach((variantKey, index) => {
                variantButtons.push(
                    <div key={variantKey}
                         data-key={variantKey}
                         onClick={this.handleViewVariant}
                         title="Select this variant to preview"
                         className={"preview-overlay-variant-button" + (defaultVariantKey === variantKey ? " selected" : "")}>
                        {index + 1}
                    </div>
                )
            });
        }
        return (
            <div className="preview-overlay-container">
                <div className="preview-overlay-adjuster">
                    <div className="preview-overlay-box">
                        {this.props.children}
                    </div>
                </div>
                <div className="preview-overlay-variant-toolbar">
                    {variantButtons}
                </div>
                <div className="preview-overlay-select-toolbar">
                    <div className="preview-overlay-select-button"
                         onClick={this.handleSelectVariant}>Copy to clipboard</div>
                    <div className="preview-overlay-select-button"
                         onClick={this.handleHidePreview}>Close preview</div>
                </div>
            </div>
        );
    }

}

export default PreviewOverlay;
