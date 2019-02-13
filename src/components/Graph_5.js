import React, { Component } from "react";
import Chart from "react-google-charts";

class Graph_5 extends Component {
    render() {
        const graph5_values = JSON.parse(localStorage.getItem('google_graph5'));
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div class="graph_example">
                            <Chart id='Graph 5'
                                width={'100%'}
                                height={'380px'}
                                chartType="ComboChart"
                                loader={<div>Loading Chart</div>}
                                data={graph5_values}
                                // Set chart options
                                options={{
                                    title: 'Vergleich der Wartungskosten und Brennstoffkosten',
                                    titleTextStyle: { color: '#000000', fontSize: 16 },
                                    fontName: "Roboto",
                                    legendTextStyle: { color: '#000000', fontSize: 10 },
                                    chartArea: { width: '60%' },
                                    vAxis: {
                                        format: '#.###\u20AC',
                                        title: 'Wartungskosten und Brennstoffkosten in €/a', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    hAxis: {
                                        title: 'Produktkombination', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    isStacked: true,
                                    seriesType: 'bars',
                                    colors: ['#4170aa', '#113969'],
                                    animation: {
                                        startup: true,
                                        duration: 1500,
                                        easing: 'out',
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

export default Graph_5;