import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stepper from 'react-stepper-horizontal';
import 'font-awesome/css/font-awesome.min.css'
import { Tooltip } from 'react-lightweight-tooltip';

import progress_img from './images/progress_home.png';

import euro_icon from './images/euro_icon.png';
import form_bg_3 from './images/form_3_bg.png';




class Budget extends Component {
    constructor(props){
        super(props)
        this.state = {
            step :3,
            budget_value:'',
           // fields: {},
            errors: {},    
           
        };
    }
   
 
    handleValidation(){
      //  let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;    
      
        let budget_value=this.budget_value.value;
        if (!budget_value.match(/^[1-9][0-9]*$/)) {
            formIsValid = false;            
            errors["budget_value"] = "Bitte geben Sie nur Zahlen ein";
          }
        if(!budget_value){
        formIsValid = false;
        errors["budget_value"] = "Bitte geben Ihre Budgetobergrenze ein";
        }
       
        if (budget_value <= 9999) {
            formIsValid = false;
            errors["budget_value"] = "Größer als gleich 10000";
          }
       
          if (budget_value >= 50001) {
            formIsValid = false;
            errors["budget_value"] = "Nicht mehr als 50000";
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
  

    render() {
        // const { rating } = this.state;
        const { values } = this.props
        const tooltipStyle = {
            content: {
              backgroundColor: '',
              color: '#fff',
              fontSize:'12px',
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '1px solid #000',  
              textAlign: 'center',        
            
            },
           
          };
   


        return (
        <div className="container-fluid wrapper">
        <Header/>
        <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-9">
                        <Stepper activeStep={ 3 }  titleFontSize={'14px'} completeColor={'#2171b9' } activeColor={'#2171b9'} completeBarColor={'#5096ff'} steps={ [{title: 'Meine Gebäudedaten '}, {title: 'Mein Strombedarf'}, {title: 'Mein Wärmebedarf'}, {title: 'Meine Präferenz'}] } />
                        </div>
                        
                    </div>            
                </div>
        <div className="container">
        <h4 className="form_heading">Meine persönliche Präferenz </h4>
        <form>

                {/* Form section starts here */}
                <div className="row" >
                    <div className="col-1 hide_tab">
                       
                    </div>
                    <div className="col-lg-10 col-sm-12 col-md-10 text-center form_4_bg" style={ { backgroundImage: 'url(' + form_bg_3 + ')',
                 backgroundPosition: 'center',
                 backgroundSize: 'contain',
                height: '450px',
                 backgroundRepeat: 'no-repeat' } }>

                  <div className="">
                  <p className="label_question " style={{textAlign:'left'}}>Wie hoch ist Ihr Budgetlimit?</p>
                    <div className="row energy_form">
                        <p className="budget_font">Budgetobergrenze (€)</p>
                        <div className="budget_icon">
                            <img src={euro_icon}   alt="Ener You" responsive className="" id=""/>   
                        </div>
                        <div className="budget_box">
                        <input type="text"  className="form-control"
                            name="budget_value" 
                            ref={(budget_value) => this.budget_value = budget_value}
                            onChange={this.props.handleChange('budget_value')}
                             className="budget_price" placeholder='Preis' defaultValue={values.budget_value} />
                               <p  className="error_font">{this.state.errors["budget_value"]}</p>
                        </div>
                        <div className="form_btn">
                            <button  onClick={this.continue}  className="btn btn_submit">Speichern</button>
                        </div>
                      

                       
                       
                    </div>
                  </div>


                       
                            
                    </div>
                    <div className="col-1 hide_tab">
                 
                    
                   
                    </div>
                </div>
                {/* Form section Ends here */}



                {/* Progress Bar section Starts here */}
                <div className="row progress_section"  style={{marginTop:'50px'}}>
                <div className="col-md-2">
                    <div className="char_next_btn_section">
                            <div className="">
                               
                                <div className="back_btn_form_2">
                                <button onClick={this.back} className="btn btn_next pull_left"><i class="fa fa-angle-left fa-1x" aria-hidden="true"></i>  &nbsp; zurück  </button>
                                </div>
                        </div>              

                
                      
                     
                    </div>
                        
                </div>
                <div className="col-md-8">
               
                </div>
                <div className="col-md-2 text-center">    
                <div className="next_section">
                        {/* <button onClick={this.continue} className="btn btn_next pull_right">Next  </button> */}
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

export default Budget;