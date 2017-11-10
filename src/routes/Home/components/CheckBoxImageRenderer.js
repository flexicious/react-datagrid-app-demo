import {  UIComponent } from '../../../js/library'

const uiUtil = flexiciousNmsp.UIUtils;
const flxConstants = flexiciousNmsp.Constants;
const uncheckBox = "http://www.htmltreegrid.com/demo/flexicious/css/images/checkboxicons/unchecked_checkbox.png";
const checkBox = "http://www.htmltreegrid.com/demo/flexicious/css/images/checkboxicons/checked_checkbox.png";

/**
 * A CheckBoxImageRenderer is a custom item renderer, that defines how to use custom cells with logic that you can control
 * @constructor
 * @namespace com.flexicious.controls
 * @extends UIComponent
 */
export default class CheckBoxImageRenderer extends UIComponent {
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
        //the add event listener will basically proxy all DomEvents to your code to handle.
        this.addEventListener(this, flxConstants.EVENT_CLICK, this.onClick);
    }

    getClassNames() {
        return ["CheckBoxImageRenderer", "UIComponent"]; //this is a mechanism to replicate the "is" and "as" keywords of most other OO programming languages
    }

    /**
     * This is important, because the grid looks for a "setData" method on the renderer.
     * In here, we intercept the call to setData, and inject our logic to populate the text input.
     * @param val
     */
    setData(val) {
        this.data = val;
        const cell = this.parent; //this is an instance of FlexDataGridDataCell (For data rows)
        const column = cell.getColumn();//this is an instance of FlexDataGridColumn.
        this.img.setAttribute("src", val[column.getDataField()] ? checkBox : uncheckBox);
    }

    /**
     * This event is dispatched when the user clicks on the icon. The event is actually a flexicious event, and has a trigger event
     * property that points back to the original domEvent.
     * @param event
     */
    onClick(evt) {
        this.toggle();
    }

    toggle() {
        const val = this.data;
        const cell = this.parent; //this is an instance of FlexDataGridDataCell (For data rows)
        const column = cell.getColumn();//this is an instance of FlexDataGridColumn.
        val[column.getDataField()] = !val[column.getDataField()];
        this.img.setAttribute("src", val[column.getDataField()] ? checkBox : uncheckBox);
        cell.level.grid.refreshCells();//this will re-render the cells.
    }

    //This sets  the inner html, and grid will try to set it. Since we are an input field, IE 8 will complain. So we ignore it since we dont need it anyway.
    setText(val) {

    }
}

flexiciousNmsp.CheckBoxImageRenderer = CheckBoxImageRenderer; //add to name space
CheckBoxImageRenderer.prototype.typeName = CheckBoxImageRenderer.typeName = 'CheckBoxImageRenderer';//for quick inspection

