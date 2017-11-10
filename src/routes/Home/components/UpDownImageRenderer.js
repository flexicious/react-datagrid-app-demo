import {  UIComponent } from '../../../js/library'
const uiUtil = flexiciousNmsp.UIUtils;
const flxConstants = flexiciousNmsp.Constants;
const downArrow = "http://htmltreegrid.com/demo/jpmc/new/experiments/images/DownArrow.png";
const upArrow = "http://htmltreegrid.com/demo/jpmc/new/experiments/images/UpArrow.png";

/**
 * A UpDownImageRenderer is a custom item renderer, that defines how to use custom cells with logic that you can control
 * @constructor
 * @namespace com.flexicious.controls
 * @extends UIComponent
 */
export default class UpDownImageRenderer extends UIComponent {
    constructor() {
        //make sure to call constructor
        super();//second parameter is the tag name for the dom element.
        this.img = new UIComponent("img");
        this.setComponentStyleAttribute("textAlign", "center");
        this.setComponentStyleAttribute("paddingTop", "4px");
        this.addChild(this.img);
        /**
         * This is a getter/setter for the data property. When the cell is created, it belongs to a row
         * The data property points to the item in the grids dataprovider that is being rendered by this cell.
         * @type {*}
         */
        this.data = null;
    }

    getClassNames() {
        return ["UpDownImageRenderer", "UIComponent"]; //this is a mechanism to replicate the "is" and "as" keywords of most other OO programming languages
    }
 
    /**
     * This is important, because the grid looks for a "setData" method on the renderer.
     * In here, we intercept the call to setData, and inject our logic to populate the text input.
     * @param val
     */
    setData(val) {
        this.data = val;
        this.img.setAttribute("src", (val.type_2 < 6) ? upArrow : downArrow);
    }

    //This sets  the inner html, and grid will try to set it. Since we are an input field, IE 8 will complain. So we ignore it since we dont need it anyway.
    setText(val) {

    }
}

flexiciousNmsp.UpDownImageRenderer = UpDownImageRenderer; //add to name space
UpDownImageRenderer.prototype.typeName = UpDownImageRenderer.typeName = 'UpDownImageRenderer';//for quick inspection