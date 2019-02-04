import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stepper from 'react-stepper-horizontal';
import StarRatingComponent from 'react-star-rating-component';
import Rating  from 'react-rating';
import 'font-awesome/css/font-awesome.min.css'

import progress_img from './images/progress_home.png';
import electric_img from './images/house_int.png';
import select from './images/select.png';
import unselect from './images/unselect.png';


class Persondetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            step :2,
           person:localStorage.getItem('person_count'),
            power_consumption:'',
            power_val:'',
            star_errors:'',
      
           
        };
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let star_val=localStorage.getItem('person_count');        
        let power_val=this.power_consumption.value;  
       
        if(star_val=='0' || star_val==null){
            formIsValid = false;
            this.setState({ star_errors: "Bitte wählen die Personenanzahl aus" });     
                 
         } 
         if (!power_val.match(/^[1-9][0-9]*$/)) {
            formIsValid = false;
            this.setState({ power_error: "Bitte geben Sie nur Zahlen ein" });
          }
          if (power_val <= 1999) {
            formIsValid = false;
            this.setState({ power_error: "Größer als 2000"});
          }
          if (power_val >= 8001) {
            formIsValid = false;          
            this.setState({ power_error: "Nicht mehr als 8000"});
          }
         if(power_val==''){
            formIsValid = false;
            this.setState({ power_error: "Bitte geben Sie Ihre jährlicher Strombedarf ein" }); 
           
         }
        


        this.setState({errors: errors});
        return formIsValid;

    }


  

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = e => {
        e.preventDefault();       
        if(this.handleValidation()){        
            this.props.nextStep();        
           
        }else{
            
        }
        
    }
 
    handleKeyPress = event => {
        if (event.key == 'Enter') {
            this.refs.but.click()
        }
      };


    handleRate (rate) {
        this.setState({ person: rate });
        localStorage.setItem("person_count",rate);
        let person_value=rate;
        if(person_value=='6'){
            this.power_consumption.focus();
             document.getElementById("power_consumption").value = "8000";           
           }else if(person_value=='5'){
            this.power_consumption.focus();
            document.getElementById("power_consumption").value = "6000";   
           }else if(person_value=='4'){
            this.power_consumption.focus();
            document.getElementById("power_consumption").value = "5000";   
            }else if(person_value=='3'){
                this.power_consumption.focus();
                document.getElementById("power_consumption").value = "4250";   
            }else if(person_value=='2'){
                this.power_consumption.focus();
                document.getElementById("power_consumption").value = "3500";   
            }
            else if(person_value=='1'){
                this.power_consumption.focus();
                document.getElementById("power_consumption").value = "2000";   
            }else{
                document.getElementById("power_consumption").value = "";   
           }
      }
    componentDidMount(){
  

    }

    render() {
        const { rating_half_star,person } = this.state;
        const { values } = this.props
   

    return (
        <div className="container-fluid wrapper">
        <Header/>
        <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-9">
                        <Stepper activeStep={ 1 }  titleFontSize={'14px'} completeColor={'#2171b9' } activeColor={'#2171b9'} completeBarColor={'#5096ff'} steps={ [{title: 'Meine Gebäudedaten '}, {title: 'Mein Strombedarf'}, {title: 'Mein Wärmebedarf'}, {title: 'Meine Präferenz'}] } />
                        </div>
                        
                    </div>            
                </div>
        <div className="container">
        <h4 className="form_heading">Mein Strombedarf  </h4>
        <form>

                {/* Form section starts here */}
                <div className="row">
                    
                    <div className="col-lg-12 " >
                            <div className="person_detail_box" style={{
                                            backgroundImage: 'url(' + electric_img + ')',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'contain',
                                            height: '450px',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                               <div class="row">
                                    <div className="col-lg-3 hide_tab"></div>
                                        <div class="col-lg-6 col-sm-12 text-center">
                                            <div className="p_box">
                                                {/* <div className="p_form_label">
                                                    Personenanzahl
                                                </div> */}
                                                {/* <span className="p_icon">
                                                    <Rating name="person" stop={6} initialRating={localStorage.getItem('person_count')}
                                                        emptySymbol={<img src={unselect} className="icon" />}
                                                        fullSymbol={<img src={select} className="icon" />}
                                                        onChange={rate => this.handleRate(rate)}
                                                    />

                                                </span> */}
                                             {/* <div className="p_form_label" style={{ borderLeft: '3px solid #2171b9' }}>{person}</div> */}
                                                </div>
                                      
                                                <p className="label_question">Wie viel Personen wohnen im Haushalt und wie hoch ist Ihr Strombedarf?</p>
                                        <div className="p_consuption">
                                            <p className="person_label"> Personenanzahl</p>
                                            <span className="p_icon">
                                            <Rating name="person" stop={6} initialRating={localStorage.getItem('person_count')}
                                                        emptySymbol={<img src={unselect} className="icon" />}
                                                        fullSymbol={<img src={select} className="icon" />}
                                                        onChange={rate => this.handleRate(rate)}
                                                    />
                                                    </span>
                                                          <span className="p_form_label">{person}</span>  
                                        </div>
                                        <p style={{ marginTop: '20px' }} className="error_font">{this.state.star_errors}</p>

                                     
                                      
                                        <div className="p_consuption">
                                            <p className="power_label">Strombedarf</p>
                                            <input type="text" name="power_consumption" id="power_consumption" className="power_text_consumption" minLength="5" maxLength='5'
                                                            placeholder='power_consumption' ref={(power_consumption) => this.power_consumption = power_consumption}
                                                            onBlur={this.props.handleChange('power_consumption')}
                                                            defaultValue={values.power_consumption} onKeyPress={this.handleKeyPress} />
                                                          <span className="kwh">kWh</span>  
                                        </div>
                                                 <p style={{textAlign:"center"}} className="error_font">{this.state.power_error}</p>

                                        </div>


                                   

                                        <div className="col-lg-3 hide_tab"></div>
                                </div>


                                

                            </div>   

                           
                              

                                              
                    </div>
                    {/* <div className="col-lg-1">
                    <p className="text-center power_text">Jährlicher Strombedarf</p>
                                <div className="">                 
                                    <div className="power_meter_box">
                                                    <input type="text" name="power_consumption" id="power_consumption" className="power_consumption" minLength="5" maxLength='5'
                                                            placeholder='power_consumption' ref={(power_consumption) => this.power_consumption = power_consumption}
                                                            onBlur={this.props.handleChange('power_consumption')}
                                                            defaultValue={values.power_consumption} onKeyPress={this.handleKeyPress} />                              
                                        </div>        
                            </div>
                            <p style={{textAlign:"center"}} className="error_font">{this.state.power_error}</p>
                    </div> */}
                </div>
                {/* Form section Ends here */}



                {/* Progress Bar section Starts here */}
                <div className="row progress_section" style={{marginTop:'25px'}}>
                <div className="col-sm-12 col-lg-2">
                    <div className="char_next_btn_section">
                            <div className="">                               
                                <div className="back_btn_form_2">
                                <button onClick={this.back} className="btn btn_next pull_left"><i class="fa fa-angle-left fa-1x" aria-hidden="true"></i>  &nbsp; zurück  </button>
                                </div>
                           </div> 
                     </div>
                 </div>
                <div className="col-sm-12 col-lg-8"></div>
                <div className="col-sm-12 col-lg-2">    
                    <div className="next_section">
                        <button onClick={this.continue}  ref="but" className="btn btn_next pull_left">weiter  &nbsp; <i class="fa fa-angle-right fa-1x" aria-hidden="true"></i> </button>
                    </div>               
               
                </div> 
                </div>
               
                {/* Progress Bar section Ends here */}

         </form>
         </div>
        <Footer/>
        </div>
    );
}
}

export default Persondetail;