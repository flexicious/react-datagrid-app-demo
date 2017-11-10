import React from 'react';
// import * as $ from 'jquery';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

(function (H) {
    H.wrap(H.seriesTypes.pie.prototype, "drawDataLabels", function (p) {

        p.call(this);

        H.each(this.points, function (point) {
            if (point.dataLabel && point.connector) {
                if (point && point.labelPos && point.connector) {
                    let d = point.connector.d.split(' ');
                    // d = [d[0], d[1], d[2], d[10], d[11], d[12]];

                    if (point.labelPos.indexOf('left') > -1) {
                        d = [d[0], (point.connector.renderer.plotBox.width - point.connector.renderer.plotBox.x) + ''/*String(Number(d[1]) + 250)*/, d[2], 'L', ...d.slice(1)];
                        point.dataLabel.attr({ "x": (point.connector.renderer.plotBox.width - point.connector.renderer.plotBox.x) - point.dataLabel.width });
                    } else if (point.labelPos.indexOf('right') > -1) {
                        d = [d[0], point.connector.renderer.plotBox.x + ''/*String(Number(d[1]) - 250)*/, d[2], 'L', ...d.slice(1)];
                        point.dataLabel.attr({ "x": point.connector.renderer.plotBox.x + point.dataLabel.width });
                    }

                    point.connector.attr({
                        d: d,
                        "stroke-dasharray": "2, 2"
                    });
                }
            }
        });
    });
})(ReactHighcharts.Highcharts)

class DonutChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
            thicknesses: props.thicknesses || []
        }

        this.getDataLabels = () => {
            return {
                enabled: true,
                formatter: function () {
                    return '<label style="padding-top: 4px;display: flex; justify-content: center; align-items: center">' +
                        '<div style="width:10px;height:10px;background:' + this.point.color + ';display:block"></div>' +
                        '&nbsp;&nbsp<span style="line-height: 110%"><b>' + this.point.name + '</b></span></label>'
                },
                distance: 20,
                useHTML: true
            }
        }

        this.getSeries = (items, thickness = []) => {
            let _series = [];
            let outerPeremeter = 100;
            let innerGap = 1;

            if(items.length > 0 && items.length > thickness.length)
                throw new Error('each item should have individual thickness provided!');

            [].forEach.call(items, function(item, i) {
                let _s = {};
                _s["name"] = "";
                _s["data"] = item;
                _s["size"] = outerPeremeter + '%';
                _s["innerSize"] = (outerPeremeter - thickness[i]) + '%';
                _series.push(_s);
                outerPeremeter = (outerPeremeter - thickness[i]) - innerGap;
            });

            return _series;
        }

        this.config = () => {
            return {
                chart: {
                    type: 'pie',
                    width: null,
                    height: null
                },
                title: null,
                yAxis: {
                    title: {
                        text: null
                    }
                },
                plotOptions: {
                    pie: {
                        // shadow: false,
                        cursor: 'pointer',
                        showInLegend: false,
                        dataLabels: this.getDataLabels()
                    },
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                    }
                },
                // legend: {
                //     layout: 'vertical',
                //     align: 'right',
                //     verticalAlign: 'top',
                //     y: 50,
                //     floating: true,
                //     borderWidth: 0,
                //     symbolRadius: 0,
                //     shadow: false,
                // },
                credits: {
                    enabled: false
                },
                series: this.getSeries(this.state.data, this.state.thicknesses)
            }
        }
    }

    componentDidMount() {

        var chart = this.chart.getChart();

        if (this.props.width) this.chart.chartRef.style.width = this.props.width;
        if (this.props.height) this.chart.chartRef.style.height = this.props.height;

        this.chart.chartRef.style.margin = '0 auto'
        // debugger;
    }

    componentWillReceiveProps(props) {
        const { data, thicknesses } = props;
        // this.chart.highcharts().series[0].setData(props.data);
        this.setState({data: data, thicknesses: thicknesses});

        if(data.length > 0) {
            this.chart.chartRef.style.display = '';
        } else {
            this.chart.chartRef.style.display = 'none';
        }
    }

    render() {
        return (
            <ReactHighcharts ref={chart => this.chart = chart} config={this.config()} />
        )
    }
}

export default DonutChart;