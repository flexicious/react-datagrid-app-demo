import './SearchComponent.css'
import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';
import {grey700} from 'material-ui/styles/colors';

const colors = [
  'list item1',
  'list item2',
  'list item3',
  'list item4',
  'list item5',
  'list item6',
  'list item8',
  'list item7',
];

/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * This value is reset with the `onNewRequest` callback.
 */
export default class SearchComponent extends Component {
  state = {
    searchText: '',
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    this.setState({
      //searchText: '',
    });
  };

  render() {
    return (
      <div className="searchComponentView">
        <h5 className="title">{this.props.label}</h5>
        <div>
          <AutoComplete
            hintText="Search.."
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            /*onNewRequest={this.handleNewRequest}*/
            dataSource={colors}
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            openOnFocus={false}
            style={{
              border: 'solid 1px #E0E0E0', borderRadius: 2, paddingLeft: 5, height:40
            }}
            underlineStyle={{display: 'none'}}
          />
          <IconButton iconStyle={{width: 30, height: 30}} style={{
            width: 40,
            height: 40,
            padding: 5,
            top: 5, left: -40
          }} onClick={() => onClick()}>
            <SearchIcon color={grey700}/>
          </IconButton>
        </div>
      </div>
    );
  }
}
