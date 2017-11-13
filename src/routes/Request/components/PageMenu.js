import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {List, ListItem, makeSelectable} from 'material-ui/List'

export default class PageMenu extends Component {
  constructor(props) {
    super(props)
    this.defaultSelected = 2;
    this.props = props;
    this.state = {
      selectedIndex: props.selectedIndex ? props.selectedIndex : this.defaultSelected,
      height: props.height ? props.height : 'auto'
    }
  }


  handleRequestChange(index, event) {
    this.setState({
      selectedIndex: index
    })
    this.props.onMenuItemClicked(this.props.menuList[index-1], index)
  };

  render() {
    var menuStyle = {
      height: this.state.height
    }

    let list = this.props.menuList.map(function (menuItem, index) {
      index = index+1;
      return (
          <ListItem key={menuItem.name + index} ref={'menuItem' + index}
                    onClick={this.handleRequestChange.bind(this, index)} primaryText={menuItem.name}
                    className={(this.state.selectedIndex === index ? 'selected ' : '') + 'menu-list'}>
            <span className='triangle' style={{visibility: this.state.selectedIndex === index ? 'visible' : 'hidden'}}/>
          </ListItem>
      )
    }.bind(this))

    return (
      <div className='pageMenu' style={menuStyle}>
        <List>
          {list}
        </List>
      </div>
    )
  }
}
