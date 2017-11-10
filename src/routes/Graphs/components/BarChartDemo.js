import React from 'react';
import BarChart from './BarChart';

const colors = [
    ['#E472EB', '#D3F27B', '#7AD8E4', '#78E5D2', '#FAD972', '#F98377'],
    ['#B42CBC', '#96BD2C', '#10A5BB', '#45B6A2', '#FFCC33', '#F55442'],
    ['#781C7F', '#588B08', '#026B88', '#1C8976', '#FCA30B', '#EB1C12']
]

const legendColors = [ '#D0D0D0', '#C0C0C0', '#B0B0B0', '#A0A0A0', '#909090', '#808080' ];

export default class BarChartDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            categories: [],
            title: '',
            subtitle: ''
        }

        this.getCategories = ([data], excludeProps) => {
            let _categories = [];
            data = data || {};
            [].forEach.call(Object.keys(data), function (prop, j) {
                if ( excludeProps.indexOf(prop) < 0 ) {
                    _categories.push(prop.substring(0, 1).toUpperCase() + prop.substring(1));
                }
            })
            return _categories;
        }

        this.getBarChartData = (data, excludeProps) => {
            let _data = [];

            [].forEach.call(data, function (o, i) {
                let _item = {};
                _item["color"] = '#ffffff';
                _item["pointWidth"] = 18;
                _item["color"] = legendColors[i];
                _item["data"] = [];
                let j = 0;
                [].forEach.call(Object.keys(o), function (prop) {
                    if ( excludeProps.indexOf(prop) >= 0 ) {
                        _item["name"] = o[prop].toString();
                    } else {
                        _item.data.push({ y: o[prop], color: colors[i][j++] })
                    }
                })
                _data.push(_item);
            })

            return _data;
        }
    }

    componentDidMount() {
        const { items } = this.props;
        this.setState({ data: this.getBarChartData(items, ['year']), categories: this.getCategories(items, ['year']) });
    }

    componentWillReceiveProps(props) {
        const { items } = props;
        this.setState({ 
            data: this.getBarChartData(items, ['year']), 
            categories: this.getCategories(items, ['year']),
            title: items.length > 0 ? 'Expenditure in Tech' : '',
            subtitle: items.length > 0  ? 'R&D costs from 2013-2015' : ''
        });
    }

    render() {
        return <BarChart title={this.state.title} 
                         subtitle={this.state.subtitle} 
                         data={this.state.data} 
                         categories={this.state.categories} 
                         width="100%" 
                         height="275px"
                         />
    }
}
