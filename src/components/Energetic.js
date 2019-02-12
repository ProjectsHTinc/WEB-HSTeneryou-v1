import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import Graph_1 from './Graph_1';
import Graph_2 from './Graph_2';
import Graphmenu from './Graphmenu';
import form_bg_3 from './images/form_3_bg.png';


class Energetic extends Component {


    constructor() {
        super();
        this.state = { tabIndex: 0 };
      }


    render(){
        return(
            <div className="container-fluid wrapper">
            <Header/>
            <h4 className="form_heading">Vergleichsübersicht der Produktkombinationen</h4>
            <center><p className="product_heading_top">
           Hier können Sie alle geeigneten Produktkombinationen im Detail miteinander vergleichen.</p>    </center>
            <div className="container">
               
                <div className="row"  >
                <div className="graph_box">
                    <Graphmenu/>
                    <div className="graph_pic">
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                        <TabList>
                        <Tab>Elektrischer Autarkiegrad</Tab>
                        <Tab>Stromfluss</Tab>
                        </TabList>
                            <TabPanel>
                                <Graph_1/>
                            </TabPanel>
                        <TabPanel>
                                <Graph_2/>    
                        </TabPanel>
                    </Tabs>
                    </div>

                    <div className="red_box">
                        <center><span className="rec_box"></span><span className="red_text">Unsere Empfehlung für Selbstversorger</span></center>
                    </div>

                   </div>
                   </div>
                    
                    <div className="container graph_table">
                    <div class="table-responsive">
                    <table class="table table-borderless" responsive>
                        <thead>
                            <tr>
                                <th>Produktkombination</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Komponenten</td>
                                <td>Strom aus dem Netz<br></br>
                                    Gaskessel<br></br>
                                    Wärmespeicher<br></br>
                                    (Referenzsystem)
                                </td>
                                <td>Photovoltaik<br></br>
                                    Pelletkessel<br></br>
                                    Wärmespeicher
                                </td>
                                <td>Photovoltaik<br></br>
                                    Pelletkessel<br></br>
                                    Wärmespeicher<br></br>
                                    Batteriespeicher<br></br>
                                    
                                </td>
                                <td>Photovoltaik<br></br>
                                    Wärmepumpe<br></br>
                                    Wärmespeicher<br></br>
                                    Heizschwert
                                </td>
                                <td>Photovoltaik<br></br>
                                    Heizschwert<br></br>
                                    Wärmespeicher<br></br>
                                    Gasbrennwertkessel
                                </td>
                                <td>Photovoltaik<br></br>
                                    Solarthermie<br></br>
                                    Wärmespeicher<br></br>
                                    Gasbrennwertkessel
                                </td>
                                <td>Photovoltaik<br></br>
                                    Solarthermie<br></br>
                                    Wärmespeicher<br></br>
                                    Gasbrennwertkessel<br></br>
                                    Batteriespeicher
                                </td>
                                <td>Blockheizkraftwerk<br></br>
                                    Spitzenlastkessel<br></br>
                                    Wärmespeicher
                                </td>
                                <td>Brennstoffzelle<br></br>
                                    Spitzenlastkessel<br></br>
                                    Wärmespeicher
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>            
                </div>
                </div>
            <Footer/>
        </div>
        )
    }
}
export default Energetic;