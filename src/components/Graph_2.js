import React, { Component } from "react";
import Chart from "react-google-charts";

class Graph_2 extends Component {

    render() {
        const graph2_values = JSON.parse(localStorage.getItem('google_graph2'));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div class="graph_example">
                            <Chart id='Graph 2'
                                width={'100%'}
                                height={'380px'}
                                chartType="ComboChart"
                                loader={<div>Loading Chart</div>}
                                data={graph2_values}
                                // Set chart options
                                options={{
                                    title: 'Vergleich des Eigenverbrauchs, Einspeisung und Netzbezug',
                                    titleTextStyle: { color: '#000000', fontSize: 16 },
                                    fontName: "Roboto",
                                    legendTextStyle: { color: '#000000', fontSize: 10 },
                                    chartArea: { width: '60%' },
                                    isStacked: true,
                                    seriesType: 'bars',
                                    colors: ['#cba550', '#9851b9', '#239b03', '#039b92', '#4170aa'],
                                    animation: {
                                        startup: true,
                                        duration: 1500,
                                        easing: 'out',
                                    },
                                    hAxis: {
                                        title: 'Anlagenkombinationen', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
                                    },
                                    vAxis: {
                                        title: 'Strom in kWh', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
                                            fontSize: 13,
                                            italic: false
                                        }
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

export default Graph_2;