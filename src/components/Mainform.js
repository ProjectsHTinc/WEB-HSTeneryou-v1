import React, {Component} from "react";
import Homedetails from './Homedetails';
import Person from './Persondetail';
import Enerydemand from './Enerydemand';
import Budget from './Budget';
import Product from './Product';


export class Mainform extends Component{
    constructor(props) {
        super(props);
        this.state = {
            step:1,
            roof_inclination :'DEGREES_0',
            living_area:'',
            post_code:'',
            directionChange:'',
            construction_year:'',
            person_count:'',
            power_consumption:'',
            energy_demand:'CONSTRUCTION_YEAR',
            yearlyGasDemand:'',
            yearlyEnergyDemand:'',
            yearlyEnergyDemandOnWater:'',
            budget_value:'',
  
        }

    }
    

        nextStep = () =>{
            const   { step } = this.state;
            this.setState ({
                step :step + 1
            })
        }

    prevStep = () =>{
        const   { step } = this.state;
        this.setState ({
            step :step - 1
        })
    }
 


  

    handleChange = input => event => {
       
        
        this.setState({ [input] : event.target.value });
        localStorage.setItem( [input] , event.target.value);
      
             
        

    }
   



 

    

    render(){

      
        const {step} = this.state;
        const { roof_inclination,living_area,post_code,directionChange,construction_year,person_count,power_consumption,energy_demand,yearlyGasDemand,yearlyEnergyDemand,yearlyEnergyDemandOnWater,budget_value} = this.state;
        const values = { roof_inclination,living_area,post_code,directionChange,construction_year,person_count,power_consumption,energy_demand,yearlyGasDemand,yearlyEnergyDemand,yearlyEnergyDemandOnWater,budget_value};
       
        switch(step){
            case 1:
                return (
                <Homedetails
                nextStep={this.nextStep}
                handleChange ={this.handleChange}  
                values={values}            
                />
                )
            case 2:
                return(
                    <Person
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange ={this.handleChange}  
                values={values}            
                />
                )
                
            case 3:
                 return (
                    <Enerydemand
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange ={this.handleChange}  
                values={values}            
                />
                )
            case 4:
                return (
                    <Budget
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange ={this.handleChange}  
                values={values}            
                />
                )
            case 5:
                return (
                    <Product
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange ={this.handleChange}  
                values={values}            
                />
                )
        }
    }
}

export default Mainform