import React, { Component } from 'react';


class Header extends Component {
    render() {
    return (
    //     <div className="container-fluid wrapper heading_border fixed-top">
    //     <div className="container ">
    //     <div className="row logo_section">
    //     <div className="logo">
    //     <a href="/">
    //         <img src={require('./images/logo.png')} alt="ENER YOU" className="" responsive/>
    //  </a>
    //     </div>
    //     </div>
     
    //     </div>
    //     </div>
    <div className="">
        
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#"></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

    <div className="container" style={{marginLeft:'0px'}}>
    <div className="collapse navbar-collapse " id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
             <a href="/">
            <img src={require('./images/logo.png')} alt="ENER YOU" className="" responsive/>
             </a>
          </li>
         
        </ul>        
      </div>
    </div>
    

    </nav>
    </div>
    );
}
}

export default Header;