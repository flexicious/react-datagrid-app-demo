import React, {Component} from 'react'
import SelectComponent from './SelectComponent'
import {GridList, GridTile} from 'material-ui/GridList'
import SearchComponent from './SearchComponent'

class PageContentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: props.pageTitle ? props.pageTitle : 'Tittle Here '
    }
    this.selectItems = [{name: 'Application'}, {name: 'Manager'}, {name: 'is Manager'}, {name: 'project1'}, {name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}, {name: 'is Manager'},{name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}, {name: 'is Manager'},{name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}, {name: 'is Manager'},{name: 'project 2'}, {name: 'project 3'}, {name: 'Application '}, {name: 'is Manager'}]
  }


  render() {

    var gridList = {
      height: 500,
      overflowY: 'auto'
    }

    return (
      <div>
        <h1 className='page-title'>Task Document for project
          - {this.props.pageTitle}</h1>

        <GridList
          cols={3}
          cellHeight={90}
          style={gridList}
        >
          {
            this.selectItems.map((item, index) => (
              <GridTile key={item.name + index}>
                {!item.name.toLowerCase().includes('manager') && <SelectComponent label={item.name}/>}
                {item.name.toLowerCase().includes('manager') && <SearchComponent label={item.name}/>}
                </GridTile>
              )
            )
          }
        </GridList>
      </div>
    )
  }
}

export default PageContentComponent;
