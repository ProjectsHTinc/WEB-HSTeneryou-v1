import React, { Component } from "react";
import Chart from "react-google-charts";

class Graph_4 extends Component {

    render() {
        const graph4_values = JSON.parse(localStorage.getItem('google_graph4'));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div class="graph_example">
                            <Chart id='Graph 4'
                                width={'100%'}
                                height={'380px'}
                                chartType="ComboChart"
                                loader={<div>Loading Chart</div>}
                                data={graph4_values}
                                // Set chart options
                                options={{
                                    title: 'Vergleich der Investitionskosten (inkl. Monatage)',
                                    titleTextStyle: { color: '#000000', fontSize: 16 },
                                    fontName: "Roboto",
                                    legendTextStyle: { color: '#000000', fontSize: 10 },
                                    chartArea: { width: '60%' },
                                    vAxis: {
                                        title: 'Investitionskosten in €', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    hAxis: {
                                        title: 'Anlagenkombinationen', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    seriesType: 'bars',
                                    colors: ['#4170aa', '#000000'],
                                    animation: {
                                        startup: true,
                                        duration: 1500,
                                        easing: 'out',
                                    },
                                    series: { 1: { type: 'line' } },
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

export default Graph_4;