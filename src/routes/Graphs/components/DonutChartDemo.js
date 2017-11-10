import React from 'react';
import DonutChart from './DonutChart'

const colors = [
    ['#F39C12', '#E74C3C', '#0011FF'],
    ['#3498D8', '#9B5986', '#FF11FF'],
    ['#34495E', '#2ECC71', '#16A085']
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

        this.getPieChartData = (data) => {
            let _data = [];
            var that = this;

            [].forEach.call(data, function (o, i) {
                let _item = [], j = 0;
                [].forEach.call(Object.keys(o), function (prop) {
                    if( prop !== 'year') {
                        _item.push({ name: prop, y: that.getPercentage(prop, o, ['year']), color: colors[i][j++] })
                    }
                });
                _data.push(_item);
            });

            return _data;
        }
    }
    
    componentDidMount() {
        const { items } = this.props;
        this.setState({ data: this.getPieChartData(items) });
    }

    componentWillReceiveProps(props) {
        const { items } = props;
        this.setState({ data: this.getPieChartData(items) });
    }

    render() {
        return <DonutChart data={this.state.data} thicknesses={[5, 17, 15]} width="50%" height="40%" />;
    }
}