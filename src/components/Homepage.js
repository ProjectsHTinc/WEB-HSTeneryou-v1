import React, { Component } from 'react';
import  VideoCover  from 'react-video-cover';
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
   
    setTimeout(() => this.setState({ loading: false }), 3000);
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
     
      <div className="container-fluid wrapper">
   
        {/* <div className="row ">
          <div className="logo">
            <a href="/">
              <img src={require('./images/logo_1.png')} alt="ENER YOU" className="" />
            </a>

          </div>
        </div> */}
        <div className="container ">
          <div className="row">
            <div className="logo">
              <a href="/">
                <img src={require('./images/logo_1.png')} alt="ENER YOU" className="" responsive />
              </a>
            </div>
          </div>

        </div>
   
        <div style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}>
          <VideoCover autoPlay
            videoOptions={videoOptions}
          />
        </div>
        <div className="container">
        <div class="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        <div className="home_box">
           <p className="home_desc text-center">
           <a href="/Form">
           <img src={require('./images/home_icon.png')} alt="ENER YOU" className=""/> 
           </a>
           <p className="home_text">Find your personalized Energy Solutions for your house</p>
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
