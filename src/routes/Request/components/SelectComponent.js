import './SelectComponent.css'
import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {TextField, IconButton} from 'material-ui'
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import {grey800} from 'material-ui/styles/colors';

const items = [
  'Application 1',
  'Application 2',
  'Application 3',
  'Application 4',
  'Application 5',
  'Application 6',
  'Application 8',
  'Application 7',
];

/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * This value is reset with the `onNewRequest` callback.
 */
export default class SearchComponent extends Component {
   constructor (props){
     super(props);
     this.items = props.items?props.items:items;
   }

  state = {
    searchText: '',
    value:0
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

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="selectComponentView">
        <h5 className="title">{this.props.label}</h5>
        <SelectField
            value={this.state.value}
            onChange={this.handleChange}
            style={{
              border: 'solid 1px #E0E0E0', borderRadius: 2, paddingLeft: 5,height:40,display:'block'
            }}
            underlineStyle={{display: 'none'}}
          >
            {
              this.items.map((item, index)=> (
                <MenuItem value={index} primaryText={item} />
              ))
            }
          </SelectField>


          {/*<AutoComplete
            hintText="Select your application"
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            dataSource={this.items}
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            openOnFocus={true}
            style={{
              border: 'solid 1px #E0E0E0', borderRadius: 2, paddingLeft: 5,height:40
            }}
            underlineStyle={{display: 'none'}}
          />
          <IconButton iconStyle={{width: 30, height: 30}} style={{
            width: 40,
            height: 40,
            padding: 5,
            top: 5, left: -40
          }} onClick={() => onClick()}>
            <DropDownIcon
              color={grey800}
            />
          </IconButton>*/}
      </div>
    );
  }
}


/*
import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

const styles = {
  customWidth: {
    width: 150,
  },
};


export default class SelectComponent extends Component{
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="selectComponentView">
        <label>{this.props.label}</label>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}

        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
      </div>
    )
  }

}
*/

