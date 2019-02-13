import React, { Component } from 'react';
import  VideoCover  from 'react-video-cover';
import home_banner from './images/home_banner.jpg';
// import sample_video from './images/sample.mp4';

// import sample_video from 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';

const body_header = {
  margin: "0px 0px"
}

class Homepage extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    localStorage.clear();
    setTimeout(() => this.setState({ loading: false }), 1000);
  }



  render() {
   
    const { loading } = this.state;

    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
    const videoOptions = {
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      autoPlay: true,
      muted:true, 
      loop: false,
      ref: videoRef => {
        this.videoRef = videoRef;
      }

    };
    return (
     
      <div className="container-fluid wrapper" style={{position:'absolute'}}>
   
{/*        
        <div className="container ">
          <div className="row">
            <div className="logo">
              <a href="/">
                <img src={require('./images/logo_1.png')} alt="ENER YOU" className="" responsive />
              </a>
            </div>
          </div>

        </div> */}
   
        <div className="container-fluid"  style={{
                                backgroundImage: 'url(' + home_banner + ')',
                                backgroundSize:'cover', backgroundPosition:'center',                           
                                height: '100vh',
                                backgroundRepeat: 'no-repeat'
                            }}  >
                             <div className="row h-100 justify-content-center align-items-center">
                             <a href="/">
                                       <img src={require('./images/home_logo.png')} alt="ENER YOU" className=""/> 
                                </a>
                             </div>
      
        </div>
        <div className="container">
        <div class="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        <div className="home_box">
           <p className="home_desc text-center">
           <a href="/Form">
           <img src={require('./images/home_icon.png')} alt="ENER YOU" className="object"/> 
           </a>
           <p className="home_text">Finden Sie die passenden Energielösungen für Ihre Immobile</p>
           </p>
          
        </div>
        </div>
        
        <div className="col-md-2"></div>
        </div>
       
        </div>
      
      </div>
      
    );
  }
}

export default Homepage;
