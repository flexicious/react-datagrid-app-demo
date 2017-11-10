import { Constants, StyleDefaults, UIUtils, ReactDataGrid, ReactDataGridColumnLevel, ReactDataGridColumn, ClassFactory, UIComponent, FlexDataGridColumnGroup, ToolbarAction } from '../../../js/library'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import CheckBoxImageRenderer from './CheckBoxImageRenderer'
import UpDownImageRenderer from './UpDownImageRenderer'
/**
 * A CustomSettingsPopup that which can be used within the filtering/binding infrastructure.
 * @constructor
 * @class CustomSettingsPopup
 * @namespace flexiciousNmsp
 * @extends UIComponent
 */

export default class CustomSettingsPopup extends UIComponent {
    constructor() {
        super({}, "div")
        this.attachClass("flexiciousGrid");
        this.setWidth(800);
        this.setHeight(600);
        this.selectedChildColumns = {};

    }

    /**
     *
     * @return {Array}
     */
    getClassNames() {
        return ["CustomSettingsPopup", "UIComponent"];
    }

    /**
     *
     * @param val
     */
    setGrid(val) {
        this.grid = val;
        const visibleCols = [];
        const cols = this.grid.getSettingsColumns();
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (col._headerText == "Investor" || col._headerText == "Sales Person" || col._headerText == "Desk") {
                if (col.getVisible())
                    visibleCols.push(col);
            }
            else
                this.grid.removeColumn(col);
        }
        this.selectedChildColumns = this.grid.selectedChildColumns ? this.grid.selectedChildColumns.slice() : [];
        this._cols = cols;
        this._visibleCols = visibleCols;
        this._filterVisible = this.grid.getFilterVisible();
        this._footerVisible = this.grid.getFooterVisible();
        this._pageSize = this.grid.getPageSize();
        this._enablePaging = this.grid.getEnablePaging();
        this._enableFilters = this.grid.getEnableFilters();
        this._enableFooters = this.grid.getEnableFooters();
    }

    /**
     *
     * @type {on}
     */
    onOK() {
        let allGroupedColumns = [];
        const collection = this.selectedColumns;
        const cols = this.grid.getSettingsColumns();
        const items = this.grid.getColumns();
        this.grid.excelOptions.columnsToExport = [];
        this.grid.selectedChildColumns = this.selectedChildColumns.slice();
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (col._headerText == "Investor" || col._headerText == "Sales Person" || col._headerText == "Desk") {

            }
            else
                this.grid.removeColumn(col);
        }

        for (const col of items) {
            if (cols.includes(col)) {
                col.setVisible(collection.includes(col));
                if (col.getVisible()) {
                    this.grid.excelOptions.columnsToExport.push(col);
                }
            }
            allGroupedColumns.push(col);
        }
        CustomSettingsPopup.buildColumns(this.grid, allGroupedColumns, (i) => { return this.selectedChildColumns[i] });
        allGroupedColumns = null;

        if (this._enableFilters)
            this.grid.setFilterVisible(this._filterVisible);
        if (this._enableFooters)
            this.grid.setFooterVisible(this._footerVisible);
        this.grid.validateNow();
        if (this._enablePaging)
            this.grid.setPageSize(this._pageSize);
        this.grid.refreshLayout();
        this.grid.removePopup(this.popup);
    }

    static buildColumns(grid, allGroupedColumns, isColumnAtIndexChecked) {

        const columnGroupHeaderText = ["AAPL 1YR Fixed", "AAPL 2YR Fixed", "AAPL 3YR Fixed", "AAPL 4YR Fixed", "AAPL 5YR Fixed"
            , "AAPL 10YR Fixed", "AAPL 15YR Fixed", "AAPL 20YR Fixed", "AAPL 25YR Fixed", "AAPL 30YR Fixed"];
        const dataFieldPrefix = ["", "aapl2yr", "aapl3yr", "aapl4yr", "aapl5yr", "aapl10yr", "aapl15yr", "aapl20yr", "aapl25yr", "aapl30yr"];
        for (let j = 0; j < columnGroupHeaderText.length; j++) {
            const columnGroup = new FlexDataGridColumnGroup();
            columnGroup.setHeaderText(columnGroupHeaderText[j]);

            const dynamicColumns = [];
            for (let i = 0; i <= 10; i++) {
                if (isColumnAtIndexChecked(i)) {
                    grid[`column${i}checked`] = true;
                    const col = DynamicColumns_addColumn(`${dataFieldPrefix[j]}type_${i}`, `Column_${i}`);
                    if (i == 0) {
                        col.itemRenderer = new ClassFactory(CheckBoxImageRenderer);
                        //col.enableCellClickRowSelect=false;
                    }
                    else if (i == 1 || i == 4 || i == 7) {
                        col.itemRenderer = new ClassFactory(UpDownImageRenderer);
                    }
                    else if (i == 2) {
                        col.cellBackgroundColorFunction = getColumn2Background;
                        col.footerOperation = "sum"
                        col.footerAlign = "center"
                        col.setEditable(true);
                    }
                    else if (i == 3 || i == 6 || i == 8) {
                        col.cellBackgroundColorFunction = getColumn3Background;
                        col.setEditable(true);
                    }
                    col.setWidth(100);
                    dynamicColumns.push(col);
                } else {
                    grid[`column${i}checked`] = false;
                }
            }

            columnGroup.setGroupedColumns(dynamicColumns);
            allGroupedColumns.push(columnGroup);
        }

        grid.setGroupedColumns(allGroupedColumns);
    }

    /**
     *
     * @param evt
     */
    onCancel(evt) {
        this.grid.removePopup(this.popup);
    }

    showDialog() {
        const actions = [ToolbarAction.create(Constants.MCS_BTN_APPLY_LABEL, this.onOK.bind(this), true),
        ToolbarAction.create(Constants.MCS_BTN_CANCEL_LABEL, this.onCancel.bind(this), true),
        ];
        this.popup = UIUtils.addPopUp(this.render(), this.grid, false, null, Constants.SETTINGS_POPUP_TITLE, actions);
        this.grid.addPopup(this.popup);
    }

    render() {
        return <div className={"settingsPopup flexiciousPopup"}>
            <div style={{ float: "left" }}>{Constants.SETTINGS_COLUMNS_TO_SHOW}
                <ReactDataGrid width={300} height={300} dataProvider={this._cols} enableActiveCellHighlight={false}
                    selectedObjects={(this._cols.length != this._visibleCols.length) ? this._visibleCols : this._cols}
                    onChange={(evt) => { this.selectedColumns = evt.grid.getSelectedObjects() } }>
                    <ReactDataGridColumn type={"checkbox"} />
                    <ReactDataGridColumn dataField={"_headerText"} headerText={Constants.SETTINGS_COLUMNS_TO_SHOW} />
                </ReactDataGrid>
            </div>
            <div style={{ float: "right" }}>
                <Checkbox className={"cbFooter"} defaultChecked={this._footerVisible} style={this._enableFooters ? {} : { "visibility": "hidden" }}
                    onCheck={(evt, newValue) => { this._footerVisible = newValue } } label={Constants.SETTINGS_SHOW_FOOTERS} />
                <Checkbox className={"cbFilters"} defaultChecked={this._filterVisible} style={this._enableFilters ? {} : { "visibility": "hidden" }}
                    onCheck={(evt, newValue) => { this._filterVisible = newValue } } label={Constants.SETTINGS_SHOW_FILTER} />
                <div>
                    <span>{Constants.SETTINGS_RECORDS_PER_PAGE + "  "}</span>
                    <TextField name="perPage" className={"txtPageSize"} defaultValue={this._pageSize || 50}
                        onChange={(evt) => { this._pageSize = parseInt(evt.currentTarget.value) } } />
                </div>

                <Checkbox defaultChecked={this.selectedChildColumns[0]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[0] = newValue } } label="Column 0" />
                <Checkbox defaultChecked={this.selectedChildColumns[1]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[1] = newValue } } label="Column 1" />
                <Checkbox defaultChecked={this.selectedChildColumns[2]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[2] = newValue } } label="Column 2" />
                <Checkbox defaultChecked={this.selectedChildColumns[3]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[3] = newValue } } label="Column 3" />
                <Checkbox defaultChecked={this.selectedChildColumns[4]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[4] = newValue } } label="Column 4" />
                <Checkbox defaultChecked={this.selectedChildColumns[5]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[5] = newValue } } label="Column 5" />
                <Checkbox defaultChecked={this.selectedChildColumns[6]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[6] = newValue } } label="Column 6" />
                <Checkbox defaultChecked={this.selectedChildColumns[7]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[7] = newValue } } label="Column 7" />
                <Checkbox defaultChecked={this.selectedChildColumns[8]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[8] = newValue } } label="Column 8" />
                <Checkbox defaultChecked={this.selectedChildColumns[9]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[9] = newValue } } label="Column 9" />
                <Checkbox defaultChecked={this.selectedChildColumns[10]}
                    onCheck={(evt, newValue) => { this.selectedChildColumns[10] = newValue } } label="Column 10" />


            </div>
        </div>;
    }
}
let DynamicColumns_counter=0;
const DynamicColumns_addColumn = (dataField, headerText) => {
    const dgCol = new flexiciousNmsp.FlexDataGridColumn();
    dgCol.setDataField(dataField);
    dgCol.setHeaderText(headerText);
    //because columns are having the same header text, we need to provide unique identifiers.
    dgCol.setUniqueIdentifier(`${headerText}${DynamicColumns_counter++}`);
    dgCol.filterControl = "TextInput";
    dgCol.filterOperation = "BeginsWith";
    dgCol.filterWaterMark = "Begins With";
    dgCol.headerAlign = "center";
    dgCol.textAlign = "center";
    dgCol.setEditable(false);
    return dgCol;
};

const DynamicColumnsGroup_addColumnGroup = headerText => {
    const dgCol = new flexiciousNmsp.FlexDataGridColumnGroup();
    dgCol.setHeaderText(headerText);
    dgCol.headerAlign = "center";
    dgCol.visible = true;
    return dgCol;
};

const getColumn2Background = cell => {
    if (cell.rowInfo.getData().type_2 > 5) {
        return '0xceefd0';
    }
    else
        return '0xefcece';
};

const getColumn3Background = cell => {
    if (cell.rowInfo.getData().type_3 == "Person 2") {
        return '0xceefd0';
    }
    else
        return '0xefcece';
};

const getColumn1Label = (item, column) => {
    if (item.type_2 < 6) {
        return "<img src='images/downIcon.png'>";
    }
    else {
        return "<img src='images/upIcon.png'>";
    }
};