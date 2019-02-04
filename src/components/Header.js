import React, { Component } from 'react';


class Header extends Component {
    render() {
    return (
        <div className="container-fluid wrapper heading_border">
        <div className="container ">
        <div className="row logo_section">
        <div className="logo">
        <a href="/">
     <img src={require('./images/logo.png')} alt="ENER YOU" className="" responsive/>
     </a>
        </div>
        </div>
     
        </div>
        </div>
    );
}
}

export default Header;