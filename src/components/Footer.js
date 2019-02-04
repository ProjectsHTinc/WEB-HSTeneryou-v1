import React, { Component } from 'react';
import footer_logo from './images/footer_logo.png';


class Footer extends Component {
    render() {
    return (
        <div className="container-fluid wrapper footer_section">
            <div className="container ">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer_links">
                            <a href="">Impressum</a>
                            <a href="">Datenschutzerklärung</a>
                            <a href="">Kontakt</a>
                        </div>
                    </div>
                    <div className="col-md-4">
                    
                    </div>
                    <div className="col-md-4 text-right">
                    <div className="footer_links">
                            <a href=""><img src={footer_logo} responsive className="" id="" /></a>
                            <a className="foot_year">2019</a>
                          
                        </div>
                    </div>
            
                </div>        
            </div>
        </div>
    );
}
}

export default Footer;