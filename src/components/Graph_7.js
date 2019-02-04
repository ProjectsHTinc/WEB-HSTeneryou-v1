import React, { Component } from "react";
import Chart from "react-google-charts";

class Graph_7 extends Component {

    render() {
        const graph7_values = JSON.parse(localStorage.getItem('google_graph7'));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div class="graph_example">
                            <Chart id='Graph 7'
                                width={'100%'}
                                height={'380px'}
                                chartType="ComboChart"
                                loader={<div>Loading Chart</div>}
                                data={graph7_values}
                                // Set chart options
                                options={{
                                    title: 'CO2-Emissionsvergleich',
                                    titleTextStyle: { color: '#000000', fontSize: 16 },
                                    fontName: "Roboto",
                                    legendTextStyle: { color: '#000000', fontSize: 10 },
                                    chartArea: { width: '60%' },
                                    hAxis: {
                                        title: 'Anlagenkombinationen', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    seriesType: 'bars',
                                    colors: ['#2fa057', '#e88e00'],
                                    animation: {
                                        startup: true,
                                        duration: 1500,
                                        easing: 'out',
                                    },
                                    pointsVisible: true,
                                    series: {
                                        0: { targetAxisIndex: 0 },
                                        1: { targetAxisIndex: 1, type: 'line' },
                                    },
                                    vAxes: {
                                        0: {
                                            title: 'CO2-Äquivalent in t/a', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                                fontSize: 13,
                                                italic: false
                                            }
                                        },
                                        1: {
                                            title: 'CO2-Vermeidungskosten in €/t', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                                fontSize: 13,
                                                italic: false
                                            }
                                        },
                                    },
                                }}
                            />
                        </div>
                        
                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div>

        )
    }
}

export default Graph_7;