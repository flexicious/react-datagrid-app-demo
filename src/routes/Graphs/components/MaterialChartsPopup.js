/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */

import React from 'react'
import ReactDOM from 'react-dom';
import { Constants, UIUtils, UIComponent, ToolbarAction } from '../../../js/library'
import MaterialAdapter from '../../../adapter/material/MaterialAdapter';
import DonutChartDemo from './DonutChartDemo';
import BarChartDemo from './BarChartDemo';

/**
 * A SaveSettingsPopup that which can be used within the filtering/binding infrastructure.
 * @constructor
 * @class SaveSettingsPopup
 * @namespace flexiciousNmsp
 * @extends UIComponent
 */
export default class MaterialChartsPopup extends UIComponent {
    constructor() {
        super({}, "div")
        this.attachClass("flexiciousGrid");

        let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.9,
        height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.9;

        this.setStyleAttribute('width', width + 'px');
        this.setStyleAttribute('height', height + 'px');
        this.popup = null;

        this._graphData = [];

        this.setGraphData = (data) => {
            this._graphData = data;
        }

        UIUtils.adapter = new flexiciousNmsp.MaterialAdapter();

    }

    /**
     *
     * @return {Array}
     */
    getClassNames() {
        return ["MaterialChartsPopup", "UIComponent"];
    }

    showDialog() {
        const actions = [ ToolbarAction.create(Constants.EVENT_CLOSE, this.onClose.bind(this), true) ];
        this.popup = flexiciousNmsp.UIUtils.addPopUp(this.render(), this.grid, true, null, "Highcharts", actions);
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
            <div>
                <DonutChartDemo items={this._graphData} />
                <BarChartDemo items={this._graphData} />
            </div>
        );
    }
}
