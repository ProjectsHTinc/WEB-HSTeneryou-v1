import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stepper from 'react-stepper-horizontal';
import 'font-awesome/css/font-awesome.min.css'

import progress_img from './images/progress_home.png';

import con_year from './images/con_year.png';
import gas_bill from './images/gas_bill.png';
import certificate from './images/certificate.png';

import form_bg_3 from './images/form_3_bg.png';




class Enerydemand extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 3,
            energy_demand: '',
            energy_val: '',
            gas_section: 'disable_gas',
            energy_section: "disable_gas",
            yearlyEnergyDemand: '',
            yearlyGasDemand: '',
            yearlyGasDemand_error: '',
           // fields: {},
            errors: {},

        };
    }



    handleValidation() {
       // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        const { values: { energy_demand } } = this.props;
        if (energy_demand === 'GAS_OR_OIL_BILL') {
            let yearlyGasDemand = this.yearlyGasDemand.value;

            if (!yearlyGasDemand.match(/^[1-9][0-9]*$/)) {
                formIsValid = false;
                errors["yearlyGasDemand"] = "Bitte geben Sie nur Zahlen ein";
            }
            if (yearlyGasDemand <= 6999) {
                formIsValid = false;
                errors["yearlyGasDemand"] = "Größer als gleich 7000";
            }
            if (yearlyGasDemand >= 52001) {
                formIsValid = false;
                errors["yearlyGasDemand"] = "Nicht mehr als 52000";
            }
            if (!yearlyGasDemand) {
                formIsValid = false;
                errors["yearlyGasDemand"] = "Bitte geben Ihre jährliche Gas- oder Heizölmenge ein";
            }
        }
        if (energy_demand === 'ENERGY_CERTIFICATE') {
            let yearlyEnergyDemand = this.yearlyEnergyDemand.value;
            let yearlyEnergyDemandOnWater = this.yearlyEnergyDemandOnWater.value;

            if (!yearlyEnergyDemand.match(/^[1-9][0-9]*$/)) {
                formIsValid = false;
                errors["yearlyEnergyDemand"] = "Bitte geben Sie nur Zahlen ein";
            }
            if (yearlyEnergyDemand <= 6999) {
                formIsValid = false;
                errors["yearlyEnergyDemand"] = "Größer als gleich 7000";
            }
            if (yearlyEnergyDemand >= 52001) {
                formIsValid = false;
                errors["yearlyEnergyDemand"] = "Nicht mehr als 52000";
            }
            if (!yearlyEnergyDemand) {
                formIsValid = false;
                errors["yearlyEnergyDemand"] = "Bitte geben Ihre Energieverbrauch ein";
            }

            if (!yearlyEnergyDemandOnWater.match(/^[1-9][0-9]*$/)) {
                formIsValid = false;
                errors["yearlyEnergyDemandOnWater"] = "Bitte geben Sie nur Zahlen ein";
            }
            if (yearlyEnergyDemandOnWater >= 5001) {
                formIsValid = false;
                errors["yearlyEnergyDemandOnWater"] = "Nicht mehr als 5000";
            }
            if (yearlyEnergyDemandOnWater <= 99) {
                formIsValid = false;
                errors["yearlyEnergyDemandOnWater"] = "Größer als gleich 100";
            }
            if (!yearlyEnergyDemandOnWater) {
                formIsValid = false;
                errors["yearlyEnergyDemandOnWater"] = "Bitter geben Ihre Anteil-Warmwasser ein";
            }
        }



        this.setState({ errors: errors });
        return formIsValid;
    }

    continue = e => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.props.nextStep();

        } else {

        }

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleKeyPress = event => {
        if (event.key == 'Enter') {
            this.refs.but.click()
        }
      };

    Gasfunction() {

        this.setState({ gas_section: "" });
        this.setState({ energy_section: "disable_gas" });
    }

    energyFunction() {

        this.setState({ energy_section: "" });
        this.setState({ gas_section: "disable_gas" });
    }
    conYear() {
        this.setState({ gas_section: "disable_gas" });
        this.setState({ energy_section: "disable_gas" });
    }

    componentDidMount() {
        const { values: { energy_demand } } = this.props;

        if (energy_demand === 'CONSTRUCTION_YEAR') {
            this.setState({ gas_section: "disable_gas" });
            this.setState({ energy_section: "disable_gas" });
        } else if (energy_demand === 'GAS_OR_OIL_BILL') {
            this.setState({ gas_section: "" });
            this.setState({ energy_section: "disable_gas" });
        } else if (energy_demand === 'ENERGY_CERTIFICATE') {
            this.setState({ energy_section: "" });
            this.setState({ gas_section: "disable_gas" });
        } else {
            this.setState({ gas_section: "disable_gas" });
            this.setState({ energy_section: "disable_gas" });
        }
    }
    render() {
        // const { job,validate } = this.state;
        const { values } = this.props


        return (
            <div className="container-fluid wrapper">
                <Header />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                        <Stepper activeStep={ 2 }  titleFontSize={'14px'} completeColor={'#2171b9' } activeColor={'#2171b9'} completeBarColor={'#5096ff'} steps={ [{title: 'Meine Gebäudedaten '}, {title: 'Mein Strombedarf'}, {title: 'Mein Wärmebedarf'}, {title: 'Meine Präferenz'}] } />
                        </div>
                        
                    </div>            
                </div>

                <div className="container">
                    <h4 className="form_heading">Mein Wärmebedarf </h4>

                    <form onSubmit={this.continue}>

                        {/* Form section starts here */}
                        <div className="row" >
                            <div className="col-1 hide_tab">
                               
                            </div>
                            
                            <div className="col-md-12 col-lg-10 col-sm-12 text-center form_3_bg" style={{
                                backgroundImage: 'url(' + form_bg_3 + ')',
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                height: '450px',
                                backgroundRepeat: 'no-repeat'
                            }}>

                                <div className="">
                                    <div className="row">

                                    </div>
                                    <p className="label_question" style={{textAlign:'left'}}>Wie hoch ist Ihr Wärmebedarf?</p>
                                    <div className="row energy_form" >
                                        <p className="enery_heading">Bestimmen Sie Ihren Wärmebedarf anhand einer der drei Möglichkeiten</p>
                                        <div className="col-md-4">
                                            <div className="enery_group">
                                                <div className="radio_value">
                                                    <input type="radio"
                                                        name="energy_demand"
                                                        value="CONSTRUCTION_YEAR"
                                                        onChange={this.props.handleChange('energy_demand')}
                                                        checked={values.energy_demand === "CONSTRUCTION_YEAR"}
                                                        onClick={this.conYear.bind(this)}
                                                    />
                                                </div>
                                                <div className="enery_icon">
                                                    <img src={con_year} circle className="" />
                                                </div>
                                                <div className="enery_label">
                                                    <p className="label_demand">Baujahr bzw. letztes Modernisierungsjahr</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="enery_group">
                                                <div className="radio_value">
                                                    <input type="radio"
                                                        name="energy_demand"
                                                        value="GAS_OR_OIL_BILL"
                                                        onChange={this.props.handleChange('energy_demand')}
                                                        checked={values.energy_demand === "GAS_OR_OIL_BILL"}
                                                        onClick={this.Gasfunction.bind(this)}
                                                    />
                                                </div>
                                                <div className="enery_icon">
                                                    <img src={gas_bill} circle className="" />
                                                </div>
                                                <div className="enery_label">
                                                    <p className="label_demand">Gasrechnung bzw. Heizölrechnung</p>
                                                </div>
                                                <div className="gas_oil_section" id={this.state.gas_section}>
                                                    <p className="label_demand_value_label">Jährliche Gasmenge bzw. Heizölmenge
<br></br> [kWh/a]</p>
                                                    <p><input type="text" className="form-control"
                                                        name="yearlyGasDemand"
                                                        ref={(yearlyGasDemand) => this.yearlyGasDemand = yearlyGasDemand}
                                                        onChange={this.props.handleChange('yearlyGasDemand')}
                                                        defaultValue={values.yearlyGasDemand} onKeyPress={this.handleKeyPress} /></p>
                                                </div>
                                                <p className="error_font">{this.state.errors["yearlyGasDemand"]}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="enery_group">
                                                <div className="radio_value">
                                                    <input type="radio"
                                                        name="energy_demand"
                                                        value="ENERGY_CERTIFICATE"
                                                        onChange={this.props.handleChange('energy_demand')}
                                                        checked={values.energy_demand === "ENERGY_CERTIFICATE"}
                                                        onClick={this.energyFunction.bind(this)} 
                                                    />
                                                </div>
                                                <div className="enery_icon">
                                                    <img src={certificate} circle className="" />
                                                </div>
                                                <div className="enery_label">
                                                    <p className="label_demand">Energieausweis</p>
                                                </div>
                                                <div className="energy_section" id={this.state.energy_section}>
                                                    <p className="label_demand_value_label">Energieverbrauch<br></br>  [kWh/a]</p>
                                                    <p><input type="text" className="form-control"
                                                        name="yearlyEnergyDemand"
                                                        onChange={this.props.handleChange('yearlyEnergyDemand')}
                                                        defaultValue={values.yearlyEnergyDemand}
                                                        ref={(yearlyEnergyDemand) => this.yearlyEnergyDemand = yearlyEnergyDemand} onKeyPress={this.handleKeyPress}
                                                    /></p>
                                                    <p className="error_font">{this.state.errors["yearlyEnergyDemand"]}</p>
                                                    <p className="label_demand_value_label">Anteil Warmwasser
 <br></br>[kWh/a]</p>
                                                    <p><input type="text" className="form-control"
                                                        name="yearlyEnergyDemandOnWater"
                                                        ref={(yearlyEnergyDemandOnWater) => this.yearlyEnergyDemandOnWater = yearlyEnergyDemandOnWater}
                                                        onChange={this.props.handleChange('yearlyEnergyDemandOnWater')}
                                                        defaultValue={values.yearlyEnergyDemandOnWater} onKeyPress={this.handleKeyPress}
                                                    /></p>
                                                    <p className="error_font">{this.state.errors["yearlyEnergyDemandOnWater"]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="energy_demand_text error_font">{this.state.yearlyEnergyDemand_error}</p>
                                    </div>
                                </div>




                            </div>
                            <div className="col-1 hide_tab">



                            </div>
                        </div>
                        {/* Form section Ends here */}



                        {/* Progress Bar section Starts here */}
                        <div className="row progress_section" style={{ marginTop: '30px' }}>
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
                                <button onClick={this.continue}  ref="but" className="btn btn_next pull_left">weiter  &nbsp; <i class="fa fa-angle-right fa-1x" aria-hidden="true"></i> </button>
                                </div>

                            </div>
                        </div>

                        {/* Progress Bar section Ends here */}

                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Enerydemand;