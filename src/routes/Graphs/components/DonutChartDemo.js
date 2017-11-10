import React from 'react';
import DonutChart from './DonutChart'

const colors = [
    // ['#F39C12', '#E74C3C', '#0011FF'],
    // ['#3498D8', '#9B5986', '#FF11FF'],
    // ['#34495E', '#2ECC71', '#16A085']


    ['#E472EB', '#D3F27B', '#7AD8E4', '#78E5D2', '#FAD972', '#F98377'],
    ['#B42CBC', '#96BD2C', '#10A5BB', '#45B6A2', '#FFCC33', '#F55442'],
    ['#781C7F', '#588B08', '#026B88', '#1C8976', '#FCA30B', '#EB1C12']
]

export default class DonutChartDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.getPercentage = (key, item = {}, excludeProps = []) => {
            let _v = !isNaN(item[key]) ? item[key] : 0;
            let _sum = 0;
            [].forEach.call(Object.keys(item), function (k) {
                if (excludeProps.indexOf(k) < 0) {
                    _sum += !isNaN(item[k]) ? item[k] : 0;
                }
            })

            return Number((_sum != 0 ? (_v / _sum) * 100.0 : 0).toFixed(2));
        }

        this.getPieChartData = (data, excludeProps = []) => {
            let _data = [];
            var that = this;

            [].forEach.call(data, function (o, i) {
                let _item = [], j = 0;
                [].forEach.call(Object.keys(o), function (prop) {
                    if (excludeProps.indexOf(prop) < 0) {
                        _item.push({ name: prop.substring(0, 1).toUpperCase() + prop.substring(1), y: that.getPercentage(prop, o, excludeProps), color: colors[i][j++] })
                    }
                });
                _data.push(_item);
            });

            return _data;
        }
    }

    componentDidMount() {
        const { items } = this.props;
        this.setState({ data: this.getPieChartData(items, ['year']) });
    }

    componentWillReceiveProps(props) {
        const { items } = props;
        this.setState({ data: this.getPieChartData(items, ['year']) });
    }

    render() {
        return <DonutChart data={this.state.data}
            thicknesses={[5, 10, 15]}
            width="100%"
            height="275px"
        />;
    }
}