import React from 'react';

import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import './rounded-corners.js';

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.data = [];
        this.categories = [];
        this.title = "";
        this.subtitle = "";

        this.config = () => {
            return {
                chart: {
                    type: 'bar',
                    width: null,
                    height: null
                },
                title: {
                    align: 'left',
                    text: this.title
                },
                subtitle: {
                    align: 'left',
                    text: this.subtitle
                },
                xAxis: {
                    // categories: ['Amazan', 'Google', 'Intel', 'Microsoft', 'Apple', 'Facebook'],
                    categories: this.categories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Investment in Billions (USD)',
                        align: 'middle'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' billions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false
                        },
                    },
                    series: {
                        groupPadding: 0.1,
                        borderRadiusTopRight: '30%',
                        // borderRadiusBottomRight: '30%',
                        borderRadiusTopLeft: '30%',
                        // borderRadiusBottomLeft: 0
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    // x: 40,
                    y: 50,
                    floating: false,
                    borderWidth: 2,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: false,
                    // padding: 100
                },
                credits: {
                    enabled: false
                },
                series: this.data
            }
        }
    }

    componentDidMount() {
        let chart = this.chart.getChart();

        if (this.props.width) this.chart.chartRef.style.width = this.props.width;
        if (this.props.height) this.chart.chartRef.style.height = this.props.height;

        this.chart.chartRef.style.margin = '0 auto';
        // debugger
    }

    componentWillReceiveProps = (props) => {
        const { title, subtitle, categories, data} = props;
        this.data = data;
        this.categories = categories;
        this.title = title;
        this.subtitle = subtitle;
        
        if(data.length > 0) {
            this.chart.chartRef.style.display = '';
        } else {
            this.chart.chartRef.style.display = 'none';
        }
    }

    render() {
        return <ReactHighcharts ref={chart => this.chart = chart} config={this.config()} />
    }
}

export default BarChart;