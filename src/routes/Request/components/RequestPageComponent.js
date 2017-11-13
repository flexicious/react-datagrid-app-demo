import React, {Component} from 'react'
import './RequestPageComponent.css'
import './PageMenu.css'
import SelectComponent from './SelectComponent'
import PageMenu from './PageMenu'
import PageContentComponent from './PageContentComponent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

class RequestPage extends Component{


  constructor(props) {
    super(props)

    this.data = props.items;

    this.pageData = [];
    this.items =[];

    if(this.data){
      for(let j=0;j<Object.keys(this.data[0]).length;j++){
        this.pageData.push({name:Object.keys(this.data[0])[j]});
      }
      for (let i=0;i<this.pageData.length;i++){
        let options = [];
        for (let j=0;j<this.data.length;j++) {
          options.push(this.data[j][this.pageData[i].name].toString())
        }
        this.items.push({name:this.pageData[i].name,options:options});
        this.pageData[i].options = options;
      }
    }

    this.menuItems = [{id:1,name: 'File '}, {id:2,name: 'project 2'}, {id:3,name: 'project 3'}, {id:4,name: 'project 4'}, {id:5,name: 'project 5'}, {id:6,name: 'sample Project'}, {id:7,name: 'demo project'}]
    this.selectItems = [{ name: 'Application'}, {name: 'Project Manager'}, {name: 'is Manager'}, {name: 'project1'}, {name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}]
    let defaultSelectedIndex = 2;
    this.state = {selectedMenuItem: this.menuItems[defaultSelectedIndex] ,selectedMenuItemIndex : defaultSelectedIndex, menuHeight:450}
  }

  onMenuSelected(item,selectedIndex) {
    this.setState({selectedMenuItem: item, selectedMenuItemIndex: selectedIndex})
  };


  render() {
    return (
      <div className='RequestPage'>
        <MuiThemeProvider>
          <div className='rowC page-menu-container'>
            <Paper ref={(pageContent)=> this.pageContent = pageContent} id="pageConent" className='col-md-10 pageContent' zDepth={2}>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 1?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 2?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} items={this.items}/>
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
              <div className="pageView" style={{display:this.state.selectedMenuItemIndex === 6?'block':'none'}}>
                <PageContentComponent pageTitle={this.state.selectedMenuItem?this.state.selectedMenuItem.name:''} />
              </div>
            </Paper>
            <PageMenu height={this.state.menuHeight +'px'} menuList={this.menuItems} selectedIndex={this.state.selectedMenuItemIndex}
                      onMenuItemClicked={this.onMenuSelected.bind(this)}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default RequestPage
