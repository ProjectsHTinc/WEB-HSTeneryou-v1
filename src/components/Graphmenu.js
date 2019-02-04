import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Graphmenu extends Component {

    render(){
        return(
            <div className="">
         
                <div className="container">
                    <div className="row" style={{marginTop:'10px'}}>
                        <div className="col-md-4">
                         
                              
                               
                                <NavLink to='/Economicgraph'   activeClassName="Graphactive">
                                <p className="tab_box_1">Wirtschaftliche Analyse</p></NavLink>
                           
                        </div>
                        <div className="col-md-4">                      
                            <NavLink to='/Emission' activeClassName="Graphactive">
                             <p className="tab_box_2">Ökologische Analyse</p>
                             </NavLink>
                           
                        </div>
                        <div className="col-md-4">
                                                   
                                <NavLink to='/Energetic'  activeClassName="Graphactive">
                                <p  className="tab_box_3">Energietechnische Analyse</p></NavLink>
                            
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}
export default Graphmenu;