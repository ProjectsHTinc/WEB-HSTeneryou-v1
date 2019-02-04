import React, { Component } from "react";
import Chart from "react-google-charts";

class Graph_3 extends Component {

    render() {
        const graph3_values = JSON.parse(localStorage.getItem('google_graph3'));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div class="graph_example">
                            <Chart id='Graph 3'
                                width={'100%'}
                                height={'380px'}
                                chartType="ComboChart"
                                loader={<div>Loading Chart</div>}
                                data={graph3_values}
                                options={{
                                    title: 'Vergleich der Annuitätskosten',
                                    titleTextStyle: { color: '#000000', fontSize: 16 },
                                    fontName: "Roboto",
                                    legendTextStyle: { color: '#000000', fontSize: 10 },
                                    chartArea: { width: '60%' },
                                    vAxis: {
                                        format: '\u20AC#.##',
                                        title: 'Annuitätische Kosten in €/a', textStyle: { color: '#000000', fontSize: 13 }, titleTextStyle: {
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
                                    colors: ['#4170aa'],
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

export default Graph_3;