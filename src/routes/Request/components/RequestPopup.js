/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */

import React from 'react'
import ReactDOM from 'react-dom';
import { Constants, UIUtils, UIComponent, ToolbarAction } from '../../../js/library'
import MaterialAdapter from '../../../adapter/material/MaterialAdapter';
import RequestPage from './RequestPageComponent';


export default class RequestPopup extends UIComponent {
    constructor() {
        super({}, "div")
        this.attachClass("flexiciousGrid");

        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.95;
        this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.98;

        this.popup = null;

        this._data = [];

        this.setData = (data) => {
            this._data = data;
        }

        UIUtils.adapter = new flexiciousNmsp.MaterialAdapter();

    }

    /**
     *
     * @return {Array}
     */
    getClassNames() {
        return ["RequestPopup", "UIComponent"];
    }

    showDialog() {
        const actions = [ ToolbarAction.create(Constants.EVENT_CLOSE, this.onClose.bind(this), true) ];
        this.popup  = UIUtils.adapter.showDialog(this.render(), this.grid, true, this.width, this.height, "Request", actions);
        // this.popup = flexiciousNmsp.UIUtils.addPopUp(this.render(), this.grid, true, null, "Request", actions);
        this.grid.addPopup(this.popup);
    }
    setGrid(val) {
        this.grid = val;
    }

    onClose(evt) {
        this.grid.removePopup(this.popup);
    }

    render() {
        return (
          <RequestPage items={this._data} />
        );
    }
}
