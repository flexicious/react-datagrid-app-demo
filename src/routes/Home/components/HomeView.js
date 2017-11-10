import React from 'react'
import { connect } from 'react-redux'
import './HomeView.scss'
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Tab, Tabs } from 'material-ui/Tabs';
import  Chip from 'material-ui/Chip';
import { Constants, StyleDefaults, UIUtils, ReactDataGrid, ReactDataGridColumnLevel, ReactDataGridColumn, ClassFactory, UIComponent } from '../../../js/library'
import CustomSettingsPopup from './CustomSettingsPopup'
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import {fetchGraphs} from '../modules/homeReducer';
import {fetchData} from '../modules/actions';
Constants.IMAGE_PATH = "http://reactdatagrid.com/images";
StyleDefaults.defaults.imagesRoot = "http://reactdatagrid.com/images";


import BarChartDemo from '../../Graphs/components/BarChartDemo';
import DonutChartDemo from '../../Graphs/components/DonutChartDemo';



export class HomeView extends React.Component {
  constructor() {
    super();
    this.allDepartments = [{ label: 'Sales', data: 'Sales' }, { label: 'Marketing', data: 'Marketing' }];
    this.tradingView_timer = null;
    this.tradingView_running = false;
    this.tradingView_repeatrate = 1;

  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
    const dp = [
      { year: 2015, google: 25.5, intel: 10.5, facebook: 112.5 },
      { year: 2014, google: 30, intel: 48, facebook: 42 },
      { year: 2013, google: 65, intel: 18, facebook: 16 },
      { year: 2012, google: 75, intel: 16, facebook: 58 },
      { year: 2011, google: 5, intel: 6, facebook: 8 },
    ];

    const grid = this.refs.tabItems.refs.grid;
    grid.setDataProvider(dp);
    grid.getColumns().map((col)=>{col.setWidth(150)})
    //CustomSettingsPopup.buildColumns(grid, grid.getColumns(), function (i) { return i < 4; })
    grid.refreshLayout();
    grid.rebuild();
  }

  onItemClick(e,item){
    if(this.refs.btnGroup.state.selectedItem == item) {
      var d = document.getElementById('menu');
      d.style.display = 'none'
      item = null;
    }

    this.refs.btnGroup.setState({selectedItem:item});
    if(this.refs.btnGroup.state.selectedItem != item)
      this.onHover.bind(this)(e,item,true);
  }

  onChipSelect(item){
    this.refs.chipsWrapper.setState({selectedItem:item});
    this.refs.tabItems.setState({value:item});
  }

  onCloseChip(item){
    var index = this.menuItems.indexOf(item);
    this.menuItems.splice(index,1);
    if(this.refs.chipsWrapper.state.selectedItem == item){
      this.refs.chipsWrapper.setState({items:this.menuItems,selectedItem:index > 0?this.menuItems[index - 1 ]:'home'});
      this.refs.tabItems.setState({items:this.menuItems,value:index > 0?this.menuItems[index - 1 ]:'home'});
    }else{
      this.refs.chipsWrapper.setState({items:this.menuItems});
      this.refs.tabItems.setState({items:this.menuItems});
    }
  }

  onMenuItemChange(event,value){
    var d = document.getElementById('menu');
    d.style.display = 'none';
    this.refs.btnGroup.setState({selectedItem:null});

    if(!this.menuItems)
      this.menuItems = [];
    if(this.menuItems.indexOf(value.props.primaryText) == -1)
      this.menuItems.push(value.props.primaryText);
    this.refs.chipsWrapper.setState({items:this.menuItems,selectedItem:value.props.primaryText});
    this.refs.tabItems.setState({items:this.menuItems,value:value.props.primaryText});
  }
  onButtonClick(){
    var data = data;
    window.location='/my/link/location';
    this.props.fetchGraphs();
  }

  onHover(e,item,update = false){
    if(!update && this.refs.btnGroup.state.selectedItem != null)
      return;

    var d = document.getElementById('menu');
    if(item == null){
      d.style.display = 'none';
      return;
    }

    d.style.display ="inline-block";
    var rect = e.currentTarget.getBoundingClientRect();
    d.style.position = "absolute";
    d.style.top= rect.bottom+'px';
    d.style.left = rect.left+'px';
    document.addEventListener('mousedown',function outSideMouseClick(event){
      if(!d.contains(event.target))
        d.style.display = 'none';

      document.removeEventListener('mousedown',outSideMouseClick);
    });
    this.refs.menu.setState({itemName:item})
  }

  onMouseOut(e){
    var d = document.getElementById('menu');
    d.style.display = 'none';
  }



  render() {

    return (
      <div>
        <ButtonGroup ref="btnGroup" onHover={this.onHover.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onItemClick={this.onItemClick.bind(this)}/>
        <MenuItems ref="menu" id='menu' onMenuItemChange={this.onMenuItemChange.bind(this)}/>
        <ChipsWrapper ref="chipsWrapper" onCloseChip={this.onCloseChip.bind(this)} onChipSelect={this.onChipSelect.bind(this)}/>
        <TabItems ref="tabItems" />

      </div>
    );
  }
}

const styles = {
  chipLabel : {
    color:'#fff'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom:'20px'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  paper : {
    margin: '16px 32px 16px 0',
    position:'absolute',
    zIndex:'1000',
    display:"none",
    minWidth:"100px"
  }
};


HomeView.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};


class ChipsWrapper extends React.Component {

  constructor(props){
    super();
    this.state = {items:[],selectedItem:'home'};
  }

  render(){

    var items = this.state.items.map((item) => {
      return (
        <Chip key={item} className={"chip"+(this.state.selectedItem == item?" active":'')} style={{textAlign:'center'}}  onClick={(e) => this.props.onChipSelect(item)} onRequestDelete={(e) => this.props.onCloseChip(item)}>
          {item}
        </Chip>
      )
    });

    return (
      <div style={styles.wrapper} ref='chipsWrapper'>
        <Chip className={"chip"+(this.state.selectedItem == 'home'?" active":'')} style={{textAlign:'center'}}  onClick={(e) => this.props.onChipSelect('home')}>
          Home
        </Chip>
        {items}
      </div>
    );
  }
}


class TabItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {items:[],value : 'home', graphData:[]};
  }

  cellBackgroundColorFunction(cell) {
    if(cell.implementsOrExtends('FlexDataGridHeaderCell')){
      return 0xe0dede;
    }
    return null;
  }


  onContextMenuSelectedRows = (e) => {
    var grid = document.querySelector('.flexiciousGrid').component;
    var selectedItems = grid.getSelectedItems();
    this.setState({graphData: selectedItems});

  }

  onContextMenuAllRows = (e) => {
    var grid = document.querySelector('.flexiciousGrid').component;
    var dataProvider = grid.getDataProvider();
    this.setState({graphData: dataProvider});
  }

  onMenuItemsChange(e,item){

    if(item.props.primaryText.toLowerCase().indexOf('all') > -1 )
      this.onContextMenuAllRows.bind(this)(e);
    else
      this.onContextMenuSelectedRows.bind(this)(e);

    var d = document.getElementById('rightClickMenu');
    d.style.display = 'none';
  }

  contextMenu(e) {
    e.preventDefault();
    var d = document.getElementById('rightClickMenu');
    var rect = e.target.getBoundingClientRect();
    d.style.position = "fixed";
    d.style.top=  rect.bottom +'px';
    d.style.left = rect.left+'px';
    d.style.display = 'inline-block';
    d.style.width = '250px';

    var items = [];
    items.push(<MenuItem key={Math.random()} primaryText="Show Chart for Selected Rows"/> )
    items.push(<MenuItem key={Math.random()} primaryText="Show Chart for All Rows"/> )
    items.push(<MenuItem key={Math.random()} primaryText='Show Chart for Selected Row'/> );
    items.push(<MenuItem key={Math.random()} primaryText='Show Chart for All'/>);
    items.push(<MenuItem key={Math.random()} primaryText='Show Chart for Selected one'/>);
    this.refs.menu.setState({items:items});
    document.addEventListener('mousedown',function onMouseClick(event){
      document.removeEventListener('mousedown',onMouseClick);
      if(!d.contains(event.target))
        d.style.display = 'none';
    });
  }

  render(){

    var tabs = this.state.items.map((item) => {
      return (<Tab key={item} label="Item Two" value={item}>
        <div>
          <h2 style={styles.headline}>{item}</h2>
          <p>
            This is example tab of value {item}
          </p>
        </div>
      </Tab>)
    });

    return(
      <div>
        <Tabs inkBarStyle={{height:0}} className="tab-bar" tabItemContainerStyle={{height:0}} value={this.state.value}>
          <Tab label="Item One" value="home" >

            <div id="grid-right-click-context" onContextMenu={this.contextMenu.bind(this)}>
              <ReactDataGrid rowHeight='90' borderThickness='0' horizontalGridLines="true" ref="grid" selectionMode="multipleRows"  enableFilters enableStickyControlKeySelection={false} enableEnterLikeTab destroyEditorOnMouseDownOnGrid={false}
                             itemClick="onItemClick" enableKeyboardNavigation popupFactorySettingsPopup={new ClassFactory(CustomSettingsPopup)} width="100%" height="400"
                             cellBackgroundColorFunction={this.cellBackgroundColorFunction} enableActiveCellHighlight horizontalScrollPolicy="auto">
                <ReactDataGridColumn filterComboBoxBuildFromGrid dataField="year" headerText="Years" filterControl="MultiSelectComboBox" width="200" />
                <ReactDataGridColumn filterComboBoxBuildFromGrid dataField="google" headerText="Google" filterControl="MultiSelectComboBox" width="200" />
                <ReactDataGridColumn filterComboBoxBuildFromGrid dataField="intel" headerText="Intel" filterControl="MultiSelectComboBox" width="200" />
                <ReactDataGridColumn filterComboBoxBuildFromGrid dataField="facebook" headerText="Facebook" filterControl="MultiSelectComboBox" width="200" />
              </ReactDataGrid>
            </div>

            <MenuItems showDefaultItems="true" id="rightClickMenu" ref="menu" onMenuItemChange= {this.onMenuItemsChange.bind(this)}/>

            <div style={{marginTop:'50px',display:this.state.graphData.length > 0 ?'block':'none'}}>
              <h2>Charts</h2>
              <DonutChartDemo items={this.state.graphData}/>
              <BarChartDemo items={this.state.graphData} />
            </div>
          </Tab>
          {tabs}
        </Tabs>
      </div>
    );
  }
}

class MenuItems extends React.Component {
  constructor(props){
    super(props)
    this.state= {itemName:'sample',items:[]};

  }

  render(){
    var children = [];
    if(this.props.showDefaultItems)
      children = this.state.items;
    else {
      for (var i = 0; i < 5; i++) {
        children.push(<MenuItem key={this.state.itemName + (i)} primaryText={this.state.itemName + (i)}/>)
      }
    }

    return(
      <Paper id={this.props.id} style={styles.paper}>
        <Menu menuItemStyle={{width:"100%"}} onItemTouchTap={this.props.onMenuItemChange}>
          {children}
        </Menu>
      </Paper>);
  }

}

const mapDispatchToProps = (dispatch) => ({
  fetchGraphs :(tilte,data) => dispatch(fetchData('graph',data))
});

const mapStateToProps = (state) => ({
  data : state
});


export class ButtonGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {selectedItem:null};
  }

  render(){
    return (
      <div style={{marginBottom:'50px'}}>
        <button className={"btn btn-bar-item"+(this.state.selectedItem == 'file' ? ' active' : '')} onMouseOver={(e) => this.props.onHover(e,'file')} onClick={(e) => this.props.onItemClick(e,'file')}>File</button>
        <button className={"btn btn-bar-item"+(this.state.selectedItem == 'requests' ? ' active' : '')} onMouseOver={(e) => this.props.onHover(e,'requests')} onClick={(e) => this.props.onItemClick(e,'requests')}>Request</button>
        <button className={"btn btn-bar-item"+(this.state.selectedItem == 'project' ? ' active' : '')} onMouseOver={(e) => this.props.onHover(e,'project')} onClick={(e) => this.props.onItemClick(e,'project')}>Project</button>
        <button className={"btn btn-bar-item"+(this.state.selectedItem == 'task' ? ' active' : '')} onMouseOver={(e) => this.props.onHover(e,'task')} onClick={(e) => this.props.onItemClick(e,'task')}>Task</button>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
