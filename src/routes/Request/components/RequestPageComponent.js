import React, {Component} from 'react'
import './RequestPageComponent.css'
import './PageMenu.css'
import PageMenu from './PageMenu'
import SelectComponent from './SelectComponent'
import PageContentComponent from './PageContentComponent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'

class RequestPage extends Component{


  constructor(props) {
    super(props)
    this.state = {selectedMenuItem: null,selectedMenuItemIndex : 2}
    this.menuItems = [{id:1,name: 'File '}, {id:2,name: 'project 2'}, {id:3,name: 'project 3'}, {id:4,name: 'project 4'}, {id:5,name: 'project 5'}, {id:6,name: 'sample Project'}, {id:7,name: 'demo project'}, {id:8,name: 'test project 1'}, {id:9,name: 'test project 2'}]
    this.selectItems = [{ name: 'Application'}, {name: 'Project Manager'}, {name: 'is Manager'}, {name: 'project1'}, {name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}]
  }

  onMenuSelected(item,selectedIndex) {
    this.setState({selectedMenuItem: item, selectedMenuItemIndex: selectedIndex})
  };


  render() {

    var gridList = {
      overflowY: 'auto'
    }

    return (
      <div className='RequestPage'>
        <MuiThemeProvider>
          <div className='rowC page-menu-container'>
            <Paper ref='pageContent' className='col-md-10 pageContent' zDepth={2}>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 1?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 6?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 2?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
                {/*<div className='col-md-12'>

                  <GridList
                    cols={3}
                    cellHeight={80}
                    style={gridList}
                  >
                    {
                      this.selectItems.map((item,index) => (
                          <GridTile key={item.name+index} row>
                            <SelectComponent label={item.name}/>
                          </GridTile>
                        )
                      )
                    }
                  </GridList>
                  <div className='col-md-4'>
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                </div>
                <div className='col-md-4'>
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                </div>
                <div className='col-md-4'>
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                  <SelectComponent />
                </div>
                </div>*/}
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 3?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 4?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 5?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
            </Paper>
            <PageMenu height='600px' menuList={this.menuItems} selectedIndex={this.state.selectedMenuItemIndex}
                      onMenuItemClicked={this.onMenuSelected.bind(this)}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default RequestPage
