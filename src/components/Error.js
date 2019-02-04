import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Error_icon from './images/404_icon.png';

class Error extends Component {
    render() {
    return (
        <div className="container-fluid wrapper">
                <Header />
        <div className="error_bg">
       
       <img src={Error_icon} alt="ENER YOU" className="mx-auto d-block" style={{paddingTop:'60px'}}/> 
      
        </div>
        <center><p><a href="/" className="btn btn_next " style={{color:'#000'}}>Back to Site</a></p> </center>
            
        <Footer/>
        </div>
    );
}
}

export default Error;