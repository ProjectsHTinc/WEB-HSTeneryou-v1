import React, { Component } from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Mainform'
import Homedetails from './components/Homedetails'
import Person from './components/Persondetail'
import Product from './components/Product'
import Graphmenu from './components/Graphmenu'
import Economicgraph from './components/Economicgraph'
import Emission from './components/Emission'
import Energetic from './components/Energetic'
import Error from './components/Error'

// import Graph_1 from './components/Graph_1'



import '../src/components/style.css'




class App extends Component {



  render() {


    return (  
       
       

        <BrowserRouter>
        <div className="loader">       
        <Switch>
        
          <Route path="/" component={Homepage} exact />
          <Route path="/Form" component={Form}  />
          <Route path="/Homedetails" component={Homedetails}  />
          <Route path="/Person" component={Person}  />
          <Route path="/Product" component={Product}  />      
          <Route path="/Graphmenu" component={Graphmenu}  />          
          <Route path="/Economicgraph" component={Economicgraph}  />
          <Route path="/Emission" component={Emission} />
          <Route path="/Energetic" component={Energetic} /> 
          <Route  component={Error} />
        {/* <Route path="/Graph_1" component={Graph_1}  />  */}
         

        </Switch>

        </div>
       
      
        </BrowserRouter>

     
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import  VideoCover  from 'react-video-cover';
// import Home_details from './component/home_details'
// import '../src/component/style.css';

// class App extends Component {
//   render() {
//     const videoOptions = {
//       src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//       autoPlay: true,
//       muted: true,
//       loop: false,
//       ref: videoRef => {
//         this.videoRef = videoRef;
//       }

//     };
//     return (
     
//       <div className="container-fluid wrapper">
//       <div className="logo">
//       {/* <img src={require('./images/arc_3.jpg')} alt="logo" className="blink-image"/>  */}
//       <p>Logo</p>
//       </div>
//         <div style={{
//           width: '100%',
//           height: '100vh',
//           overflow: 'hidden',
//         }}>
//           <VideoCover autoPlay
//             videoOptions={videoOptions}
//           />
//         </div>
//         <div className="container">
//         <div className="home_box">
//            <p className="home_desc"><a href="/home_details">Home</a></p>
          
//         </div>
//         </div>
//       </div>
      
//     );
//   }
// }

// export default App;
