import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

import product_1 from './images/product_1.png';
import product_2 from './images/product_2.png';
import product_3 from './images/product_3.png';

import graph_img from './images/graph_icon.png';

import error_img from './images/error_img.png';
import img_loading from './images/loader.gif';

class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step:1,
            status: '',
            recommentations_value: [],
            systemCombinations_value: [],
            fieldViolations_value:[],
        };
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    componentDidMount() {
        const { values: { roof_inclination, living_area, post_code, directionChange, construction_year, power_consumption, energy_demand, yearlyGasDemand, yearlyEnergyDemand, yearlyEnergyDemandOnWater } } = this.props;
        let local_person_count = localStorage.getItem('person_count');


        // var data = {
        //     "building": {
        //         "postalCode": '23456',
        //         "constructionYear": "FROM1969_TO1978",
        //         "livingSpace": 150,
        //         "roofAlignment": "SOUTH",
        //         "roofTilt": "DEGREES_35"
        //     },
        //     "energyDemand": {
        //         "personCount": 5,
        //         "energyDemand": 5005,
        //         "headingDemandType": "CONSTRUCTION_YEAR"
        //     }
        // }

          if (energy_demand === 'CONSTRUCTION_YEAR'){

            var data = {
                "building": {
                    "postalCode": post_code,
                    "constructionYear": construction_year,
                    "livingSpace": living_area,
                    "roofAlignment": directionChange,
                    "roofTilt": roof_inclination
                },
                "energyDemand": {
                    "personCount": local_person_count,
                    "energyDemand": power_consumption,
                    "headingDemandType": energy_demand
                }
              }
          } 

          if (energy_demand === 'GAS_OR_OIL_BILL'){
            var data = {
                "building": {
                    "postalCode": post_code,
                    "constructionYear": construction_year,
                    "livingSpace": living_area,
                    "roofAlignment": directionChange,
                    "roofTilt": roof_inclination
                },
                "energyDemand": {
                    "personCount": local_person_count,
                    "energyDemand": power_consumption,
                    "headingDemandType": energy_demand,
                    "yearlyGasDemand": yearlyGasDemand
                }
              }
          } 

          if (energy_demand === 'ENERGY_CERTIFICATE'){ 
            var data = {
                "building": {
                    "postalCode": post_code,
                    "roofAlignment": directionChange,
                    "roofTilt": roof_inclination
                },
                "energyDemand": {
                    "energyDemand": power_consumption,
                    "headingDemandType": energy_demand,
                    "yearlyEnergyDemand": yearlyEnergyDemand,
                    "yearlyEnergyDemandOnWater": yearlyEnergyDemandOnWater
                }
              }
          }

        fetch("http://52.15.238.228:8080/eneryou/api/recommentations", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
       
        .then(response => {
             localStorage.setItem("response_status",response.status)
            this.setState({"status":response.status})
            if (response.status === 200) {
                console.log("loaded");
                response.json().then(response_data => {
                    this.setState({ 
                        recommentations_value: response_data.recommentations, 
                        systemCombinations_value:response_data.systemCombinations,
                        loading: true 
                        });
                });
            } else if (response.status === 400) {
                console.log("loaded");
                response.json().then(response_data => {
                    this.setState({
                        fieldViolations_value: response_data.fieldViolations,
                        loading: true
                        });
                });
            } 
            // else if (response.status === 500) {
            //     console.log("loaded");
            //     response.json().then(response_data => {
            //         this.setState({
                        
            //             });
            //     });
            // } 
        })

        .catch((error) => {
              console.error(error);
            })
    }

    render() {

        function formatNumber(number, options) {
            /** @type {Array.<string>} */
            var result = (options['fraction'] ? number.toFixed(options['fraction']) : '' + number).split('.');
            return options['prefix'] +
                result[0].replace(/\B(?=(\d{3})+(?!\d))/g,
                /** @type {string} */(options['grouping'])) +
                (result[1] ? options['decimal'] + result[1] : '') +
                options['suffix'];
        }

        let i = 0;
        let recommentations_list_1 = [];
        let recommentations_list_1_furthering = [];
        let recommentations_list_1_investCost = [];
        let recommentations_list_1_operatingCost = [];
        let recommentations_list_2 = [];
        let recommentations_list_2_furthering = [];
        let recommentations_list_2_investCost = [];
        let recommentations_list_2_operatingCost = [];
        let recommentations_list_3 = [];
        let recommentations_list_3_furthering = [];
        let recommentations_list_3_investCost = [];
        let recommentations_list_3_operatingCost = [];
        let error_values_field = [];
        let error_values_message = [];
        let disp_rows;
              
        for (i = 0; i < this.state.fieldViolations_value.length; i++) {
            error_values_field.push(this.state.fieldViolations_value[0].field);
            error_values_message.push(this.state.fieldViolations_value[0].message);
        }

        
        for (i = 0; i < this.state.recommentations_value.length; i++) {
            
            let prod_1_len_1 = this.state.recommentations_value[0].products.length;
            let prod_1_len_2 = this.state.recommentations_value[1].products.length;
            let prod_1_len_3 = this.state.recommentations_value[2].products.length;
            
            //console.log(prod_1_len_1)
            //console.log(prod_1_len_2)
            //console.log(prod_1_len_3)

            if((prod_1_len_1 > prod_1_len_2) || (prod_1_len_1 > prod_1_len_3)){ 
                disp_rows = prod_1_len_1;
            }

            if((prod_1_len_2 > prod_1_len_1) || (prod_1_len_2 > prod_1_len_3)){ 
                disp_rows = prod_1_len_2;
            }

            if((prod_1_len_3 > prod_1_len_1) || (prod_1_len_3 > prod_1_len_2)){ 
                disp_rows = prod_1_len_3;
            }

            //console.log(disp_rows)
            

            if (i === 0) {
                //recommentations_list_1_type.push(this.state.recommentations_value[0].type);
                let furthering_1 = formatNumber(this.state.recommentations_value[0].furthering,{
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                   });
                recommentations_list_1_furthering.push(furthering_1);

                let investCost_1 = formatNumber(this.state.recommentations_value[0].investCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_1_investCost.push(investCost_1);

                let operatingCost_1 = formatNumber(this.state.recommentations_value[0].operatingCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_1_operatingCost.push(operatingCost_1);
                //recommentations_list_1_systemCombinationPosition.push(this.state.recommentations_value[0].systemCombinationPosition);
                
                let j = 0;
                let products_1 = [];
                let componentName_1='';
                let logo_1="";
                let price_1 ='';
                let productName_1='';
                products_1 = this.state.recommentations_value[0].products;
                let prod_1_len = this.state.recommentations_value[0].products.length;
                
                for (j = 0; j < disp_rows; j++) {
                   
                 if(prod_1_len > j){                  
                     componentName_1 = products_1[j]['componentName'];
                    logo_1 = products_1[j]['logoPath'];
                    //logo_1 = "logo_01.png";
                    price_1 = formatNumber(products_1[j]['price'], {
                                'decimal': ',',
                                'grouping': '.',
                                'fraction': 2,
                                'prefix': '',
                                'suffix': ' €'
                            });
                     productName_1 = products_1[j]['productName'];
                 }else{
                     componentName_1 = "";
                     price_1 = "";
                     productName_1 = "";
                     logo_1 = 'default.png';
                 }
                    recommentations_list_1.push(<tr><td>{componentName_1}<br></br><img src={require(`./logos/${logo_1}`)} alt={componentName_1} width="100" className="" /></td><td>{productName_1}</td><td className="price_cost">{price_1}</td></tr>);
                }
            }
          
            
            if (i === 1) {
                //recommentations_list_2_type.push(this.state.recommentations_value[1].type);
                let furthering_2 = formatNumber(this.state.recommentations_value[1].furthering, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_2_furthering.push(furthering_2);

                let operatingCost_2 = formatNumber(this.state.recommentations_value[1].operatingCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_2_operatingCost.push(operatingCost_2);

                let investCost_2 = formatNumber(this.state.recommentations_value[1].investCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_2_investCost.push(investCost_2);
                //recommentations_list_2_systemCombinationPosition.push(this.state.recommentations_value[1].systemCombinationPosition);
                let k = 0;
                let products_2 = [];
                let componentName_2='';
                let logo_2="";
                let price_2 ='';
                let productName_2='';
                products_2 = this.state.recommentations_value[1].products;
                let prod_2_len = this.state.recommentations_value[1].products.length;
                
                for (k = 0; k < disp_rows; k++) {
                 if(prod_2_len > k){                  
                     componentName_2 = products_2[k]['componentName'];
                     logo_2 = products_2[k]['logoPath'];
                    //logo_2 = "logo_02.png";
                     price_2 = formatNumber(products_2[k]['price'], {
                                'decimal': ',',
                                'grouping': '.',
                                'fraction': 2,
                                'prefix': '',
                                'suffix': ' €'
                            });
                     productName_2 = products_2[k]['productName'];
                 }else{
                     componentName_2 = "";
                     price_2 = "";
                     logo_2 = "default.png";
                     productName_2 = "";
                 }
                    recommentations_list_2.push(<tr><td>{componentName_2}<br></br><img src={require(`./logos/${logo_2}`)} alt={componentName_2} width="100" className="" /></td><td>{productName_2}</td><td className="price_cost">{price_2}</td></tr>);
                }
            }
            
            
            if (i === 2) {
                //recommentations_list_3_type.push(this.state.recommentations_value[2].type);
                let furthering_3 = formatNumber(this.state.recommentations_value[2].furthering, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_3_furthering.push(furthering_3);

                let operatingCost_3 = formatNumber(this.state.recommentations_value[2].operatingCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_3_operatingCost.push(operatingCost_3);

                let investCost_3 = formatNumber(this.state.recommentations_value[2].investCost, {
                    'decimal': ',',
                    'grouping': '.',
                    'fraction': 2,
                    'prefix': '',
                    'suffix': ' €'
                });
                recommentations_list_3_investCost.push(investCost_3);
                //recommentations_list_3_systemCombinationPosition.push(this.state.recommentations_value[2].systemCombinationPosition);

                let l = 0;
                let products_3 = [];
                let componentName_3='';
                let price_3 ='';
                let logo_3='';
                let productName_3='';
                products_3 = this.state.recommentations_value[2].products;
                let prod_3_len = this.state.recommentations_value[2].products.length;
                
                for (l = 0; l < disp_rows; l++) {
                 if(prod_3_len > l){                  
                     componentName_3 = products_3[l]['componentName'];
                      logo_3 = products_3[l]['logoPath'];
                    //logo_3 = "logo_03.png";
                     price_3 = formatNumber(products_3[l]['price'], {
                                'decimal': ',',
                                'grouping': '.',
                                'fraction': 2,
                                'prefix': '',
                                'suffix': ' €'
                            });
                     productName_3 = products_3[l]['productName'];
                 }else{
                     componentName_3 = "";
                     price_3 = "";
                     productName_3 = "";
                     logo_3 = "default.png";
                 }
                    recommentations_list_3.push(<tr><td>{componentName_3}<br></br><img src={require(`./logos/${logo_3}`)} alt={componentName_3} width="100" className="" /></td><td>{productName_3}</td><td className="price_cost">{price_3}</td></tr>);
                }
            }
        }

        let graph_1 = [];
        let graph_2 = [];
        let graph_3 = [];
        let graph_3_1 = [];
        let graph_3_2 = [];
        let graph_4 = [];
        let graph_5 = [];
        let graph_6 = [];
        let graph_6_1 = [];
        let graph_6_2 = [];
        let graph_7 = [];
        let graph_7_1 = [];
        let graph_7_2 = [];

        graph_1.push(['', 'Autarkiegrad']);
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let energeticValues = this.state.systemCombinations_value[i].energeticValues;
            let energeticSelfSufficiency = Math.round(energeticValues['energeticSelfSufficiency']);
            graph_1.push([systemCombinationPosition, energeticSelfSufficiency]);
        }

        graph_2.push(['', 'Self Sufficiency', 'Netzbezug', 'Eigenverbrauch-PV', 'Eigenverbrauch-BHKW', 'Einspeisung-PV', 'Einspeisung-BHKW']);
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let energeticValues = this.state.systemCombinations_value[i].energeticValues;
            let energeticSelfSufficiency = energeticValues['energeticSelfSufficiency'];
            let energeticNetConsumption = energeticValues['energeticNetConsumption'];
            if (energeticNetConsumption == null) { energeticNetConsumption = 0 }
            let energeticOwnConsumptionPV = energeticValues['energeticOwnConsumptionPV'];
            if (energeticOwnConsumptionPV == null) { energeticOwnConsumptionPV = 0 }
            let energeticOwnConsumptionBHKW = energeticValues['energeticOwnConsumptionBHKW'];
            if (energeticOwnConsumptionBHKW == null) { energeticOwnConsumptionBHKW = 0 }
            let energeticPowerSupplyPV = energeticValues['energeticPowerSupplyPV'];
            if (energeticPowerSupplyPV == null) { energeticPowerSupplyPV = 0 }
            let energeticPowerSupplyBHKW = energeticValues['energeticPowerSupplyBHKW'];
            if (energeticPowerSupplyBHKW == null) { energeticPowerSupplyBHKW = 0 }
            graph_2.push([systemCombinationPosition, energeticSelfSufficiency, energeticNetConsumption, energeticOwnConsumptionPV, energeticOwnConsumptionBHKW, energeticPowerSupplyPV, energeticPowerSupplyBHKW]);
        }

        graph_3_1.push(['', 'Annuitätskosten']);
        for (i = 0; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[0].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[0].economicValues;
            let annuityCost = economicValues['annuityCost'];
                graph_3_1.push([systemCombinationPosition, annuityCost]);
            break;
        }
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[i].economicValues;
            let annuityCost = economicValues['annuityCost'];
                graph_3_2.push([systemCombinationPosition, annuityCost]);
        }


        graph_4.push(['', 'annuityCost', 'Investitionskosten', 'Budgetobergrenze (€)']);
        //graph_4.push(['', 'annuityCost', 'Investitionskosten', 'Budgetobergrenze (€)']);
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let budget_value_amount = Number(localStorage.getItem('budget_value'));
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[i].economicValues;
            let annuityCost = economicValues['annuityCost'];
            let investCost = economicValues['investCost'];
            graph_4.push([systemCombinationPosition, annuityCost, investCost, budget_value_amount]);
        }


        graph_5.push(['', 'annuityCost', 'Betriebskosten', 'Brennstoffkosten']);
        //graph_5.push(['', 'annuityCost', 'Betriebskosten', 'Brennstoffkosten']);
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[i].economicValues;
            let annuityCost = economicValues['annuityCost'];
            let operatingCost = economicValues['operatingCost'];
            let yearlyFuelCost = economicValues['yearlyFuelCost'];
            graph_5.push([systemCombinationPosition, annuityCost, operatingCost, yearlyFuelCost]);
        }

        graph_6_1.push(['', 'annuityCost', 'Stromkosten', 'Heizkosten']);
        for (i = 0; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[i].economicValues;
            let annuityCost = economicValues['annuityCost'];
            let monthlyHeadingCost = economicValues['monthlyHeadingCost'];
            let monthlyEnergyCost = economicValues['monthlyEnergyCost'];
            graph_6_1.push([systemCombinationPosition, annuityCost, monthlyEnergyCost, monthlyHeadingCost]);
            break;
        }
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let economicValues = this.state.systemCombinations_value[i].economicValues;
            let annuityCost = economicValues['annuityCost'];
            let monthlyHeadingCost = economicValues['monthlyHeadingCost'];
            let monthlyEnergyCost = economicValues['monthlyEnergyCost'];
            graph_6_2.push([systemCombinationPosition, annuityCost, monthlyEnergyCost, monthlyHeadingCost]);
        }


        graph_7_1.push(['', 'CO2-Äquivalent in t/a', 'CO2-Vermeidungskosten']);
        for (i = 0; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[0].systemCombinationPosition);
            let ecologicValues = this.state.systemCombinations_value[0].ecologicValues;
            let yearlyCO2Equivalent = ecologicValues['yearlyCO2Equivalent'];
            let yearlyAbatementCosts = ecologicValues['yearlyAbatementCosts'];
            graph_7_1.push([systemCombinationPosition, yearlyCO2Equivalent, yearlyAbatementCosts]);
            break;
        }
        for (i = 1; i < this.state.systemCombinations_value.length; i++) {
            let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
            let ecologicValues = this.state.systemCombinations_value[i].ecologicValues;
            let yearlyCO2Equivalent = ecologicValues['yearlyCO2Equivalent'];
            let yearlyAbatementCosts = ecologicValues['yearlyAbatementCosts'];
            graph_7_2.push([systemCombinationPosition, yearlyCO2Equivalent, yearlyAbatementCosts]);
        }

        graph_1.sort(function (a, b) {
            return b[1] - a[1];
        })

        graph_2.sort(function (a, b) {
            return b[1] - a[1];
        })
        graph_2.map(function (val) {
            return val.splice(1, 1);
        });

        graph_3_2.sort(function (a, b) {
            return a[1] - b[1];
        })
        graph_3 = graph_3_1.concat(graph_3_2);
        
        graph_4.sort(function (a, b) {
            return a[1] - b[1];
        })
        graph_4.map(function (val) {
            return val.splice(1, 1);
        });

        graph_5.sort(function (a, b) {
            return a[1] - b[1];
        })
        graph_5.map(function (val) {
            return val.splice(1, 1);
        });

        graph_6_2.sort(function (a, b) {
            return a[1] - b[1];
        })
        graph_6 = graph_6_1.concat(graph_6_2);
        graph_6.map(function (val) {
            return val.splice(1, 1);
        });

        graph_7_2.sort(function (a, b) {
            return a[1] - b[1];
        })
        graph_7 = graph_7_1.concat(graph_7_2);


        // for (let i = 1; i < graph_3.length; i++) {
        //    if (i==2) { 
        //         graph_3[i].push('color:#e81515');
        //     } else {
        //         graph_3[i].push('color:#4170aa');
        //     }
        // }

        // for (let i = 1; i < graph_4.length; i++) {
        //     if (i==2) { 
        //          graph_4[i].push('color:[#e81515,#000000]');
        //      } else {
        //          graph_4[i].push('color:[#4170aa,#000000]');
        //      }
        //  }

        //  for (let i = 1; i < graph_5.length; i++) {
        //     if (i==1) { 
        //          graph_5[i].push('color:#e81515','color:#000000');
        //      } else {
        //          graph_5[i].push('color:#4170aa','color:#000000');
        //      }
        //  }


        
        // let graph1_values_1 = [];
        // let graph1_values_2 = [];
        // let graph_1_values = [];
        // let graph1_text = "";
        // for (i = 0; i < graph_1.length; i++) {
        //     graph1_values_1 = graph_1[i][0];
        //     if (graph1_values_1 === "9") {
        //         graph1_text = "FC + PLB + TS";
        //     }
        //     if (graph1_values_1 === "8") {
        //         graph1_text = "CHP + PLB + TS";
        //     }
        //     if (graph1_values_1 === "7") {
        //         graph1_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph1_values_1 === "6") {
        //         graph1_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph1_values_1 === "5") {
        //         graph1_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph1_values_1 === "4") {
        //         graph1_text = "PV + HP + TS";
        //     }
        //     if (graph1_values_1 === "3") {
        //         graph1_text = "PV + BS + PB + TS";
        //     }
        //     if (graph1_values_1 === "2") {
        //         graph1_text = "PV + PB + TS";
        //     }
        //     if (graph1_values_1 === "1") {
        //         graph1_text = "Reference";
        //     }
        //     graph1_values_2 = graph_1[i][1];
        //     graph_1_values.push([graph1_text, graph1_values_2]);
        // }


        // let graph2_values_1 = [];
        // let graph2_values_2 = [];
        // let graph2_values_3 = [];
        // let graph2_values_4 = [];
        // let graph2_values_5 = [];
        // let graph2_values_6 = [];
        // let graph_2_values = [];
        // let graph2_text = "";
        // for (i = 0; i < graph_2.length; i++) {
        //     graph2_values_1 = graph_2[i][0];
        //     if (graph2_values_1 === "9") {
        //         graph2_text = "FC + PLB + TS";
        //     }
        //     if (graph2_values_1 === "8") {
        //         graph2_text = "CHP + PLB + TS";
        //     }
        //     if (graph2_values_1 === "7") {
        //         graph2_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph2_values_1 === "6") {
        //         graph2_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph2_values_1 === "5") {
        //         graph2_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph2_values_1 === "4") {
        //         graph2_text = "PV + HP + TS";
        //     }
        //     if (graph2_values_1 === "3") {
        //         graph2_text = "PV + BS + PB + TS";
        //     }
        //     if (graph2_values_1 === "2") {
        //         graph2_text = "PV + PB + TS";
        //     }
        //     if (graph2_values_1 === "1") {
        //         graph2_text = "Reference";
        //     }
        //     graph2_values_2 = graph_2[i][1];
        //     graph2_values_3 = graph_2[i][2];
        //     graph2_values_4 = graph_2[i][3];
        //     graph2_values_5 = graph_2[i][4];
        //     graph2_values_6 = graph_2[i][5];
        //     graph_2_values.push([graph2_text, graph2_values_2, graph2_values_3, graph2_values_4, graph2_values_5, graph2_values_6]);
        // }


        // let graph3_values_1 = [];
        // let graph3_values_2 = [];
        // let graph_3_values = [];
        // let graph3_text = "";
        // for (i = 0; i < graph_3.length; i++) {
        //     graph3_values_1 = graph_3[i][0];
        //     if (graph3_values_1 === "9") {
        //         graph3_text = "FC + PLB + TS";
        //     }
        //     if (graph3_values_1 === "8") {
        //         graph3_text = "CHP + PLB + TS";
        //     }
        //     if (graph3_values_1 === "7") {
        //         graph3_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph3_values_1 === "6") {
        //         graph3_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph3_values_1 === "5") {
        //         graph3_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph3_values_1 === "4") {
        //         graph3_text = "PV + HP + TS";
        //     }
        //     if (graph3_values_1 === "3") {
        //         graph3_text = "PV + BS + PB + TS";
        //     }
        //     if (graph3_values_1 === "2") {
        //         graph3_text = "PV + PB + TS";
        //     }
        //     if (graph3_values_1 === "1") {
        //         graph3_text = "Reference";
        //     }
        //     graph3_values_2 = graph_3[i][1];
        //     graph_3_values.push([graph3_text, graph3_values_2]);
        // }


        // let graph4_values_1 = [];
        // let graph4_values_2 = [];
        // let graph4_values_3 = [];
        // let graph_4_values = [];
        // let graph4_text = "";
        // for (i = 0; i < graph_4.length; i++) {
        //     graph4_values_1 = graph_4[i][0];
        //     if (graph4_values_1 === "9") {
        //         graph4_text = "FC + PLB + TS";
        //     }
        //     if (graph4_values_1 === "8") {
        //         graph4_text = "CHP + PLB + TS";
        //     }
        //     if (graph4_values_1 === "7") {
        //         graph4_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph4_values_1 === "6") {
        //         graph4_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph4_values_1 === "5") {
        //         graph4_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph4_values_1 === "4") {
        //         graph4_text = "PV + HP + TS";
        //     }
        //     if (graph4_values_1 === "3") {
        //         graph4_text = "PV + BS + PB + TS";
        //     }
        //     if (graph4_values_1 === "2") {
        //         graph4_text = "PV + PB + TS";
        //     }
        //     if (graph4_values_1 === "1") {
        //         graph4_text = "Reference";
        //     }
        //     graph4_values_2 = graph_4[i][1];
        //     graph4_values_3 = graph_4[i][2];
        //     graph_4_values.push([graph4_text, graph4_values_2, graph4_values_3]);
        // }


        // let graph5_values_1 = [];
        // let graph5_values_2 = [];
        // let graph5_values_3 = [];
        // let graph_5_values = [];
        // let graph5_text = "";
        // for (i = 0; i < graph_5.length; i++) {
        //     graph5_values_1 = graph_5[i][0];
        //     if (graph5_values_1 === "9") {
        //         graph5_text = "FC + PLB + TS";
        //     }
        //     if (graph5_values_1 === "8") {
        //         graph5_text = "CHP + PLB + TS";
        //     }
        //     if (graph5_values_1 === "7") {
        //         graph5_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph5_values_1 === "6") {
        //         graph5_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph5_values_1 === "5") {
        //         graph5_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph5_values_1 === "4") {
        //         graph5_text = "PV + HP + TS";
        //     }
        //     if (graph5_values_1 === "3") {
        //         graph5_text = "PV + BS + PB + TS";
        //     }
        //     if (graph5_values_1 === "2") {
        //         graph5_text = "PV + PB + TS";
        //     }
        //     if (graph5_values_1 === "1") {
        //         graph5_text = "Reference";
        //     }
        //     graph5_values_2 = graph_5[i][1];
        //     graph5_values_3 = graph_5[i][2];
        //     graph_5_values.push([graph5_text, graph5_values_2, graph5_values_3]);
        // }

        // let graph6_values_1 = [];
        // let graph6_values_2 = [];
        // let graph6_values_3 = [];
        // let graph_6_values = [];
        // let graph6_text = "";
        // for (i = 0; i < graph_6.length; i++) {
        //     graph6_values_1 = graph_6[i][0];
        //     if (graph6_values_1 === "9") {
        //         graph6_text = "FC + PLB + TS";
        //     }
        //     if (graph6_values_1 === "8") {
        //         graph6_text = "CHP + PLB + TS";
        //     }
        //     if (graph6_values_1 === "7") {
        //         graph6_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph6_values_1 === "6") {
        //         graph6_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph6_values_1 === "5") {
        //         graph6_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph6_values_1 === "4") {
        //         graph6_text = "PV + HP + TS";
        //     }
        //     if (graph6_values_1 === "3") {
        //         graph6_text = "PV + BS + PB + TS";
        //     }
        //     if (graph6_values_1 === "2") {
        //         graph6_text = "PV + PB + TS";
        //     }
        //     if (graph6_values_1 === "1") {
        //         graph6_text = "Reference";
        //     }
        //     graph6_values_2 = graph_6[i][1];
        //     graph6_values_3 = graph_6[i][2];
        //     graph_6_values.push([graph6_text, graph6_values_2, graph6_values_3]);
        // }

        // let graph7_values_1 = [];
        // let graph7_values_2 = [];
        // let graph7_values_3 = [];
        // let graph_7_values = [];
        // let graph7_text = "";
        // for (i = 0; i < graph_7.length; i++) {
        //     graph7_values_1 = graph_7[i][0];
        //     if (graph7_values_1 === "9") {
        //         graph7_text = "FC + PLB + TS";
        //     }
        //     if (graph7_values_1 === "8") {
        //         graph7_text = "CHP + PLB + TS";
        //     }
        //     if (graph7_values_1 === "7") {
        //         graph7_text = "PV + ST + BS + CGB + TS ";
        //     }
        //     if (graph7_values_1 === "6") {
        //         graph7_text = "PV + ST + CGB + TS";
        //     }
        //     if (graph7_values_1 === "5") {
        //         graph7_text = "PV + HR + CGB + TS";
        //     }
        //     if (graph7_values_1 === "4") {
        //         graph7_text = "PV + HP + TS";
        //     }
        //     if (graph7_values_1 === "3") {
        //         graph7_text = "PV + BS + PB + TS";
        //     }
        //     if (graph7_values_1 === "2") {
        //         graph7_text = "PV + PB + TS";
        //     }
        //     if (graph7_values_1 === "1") {
        //         graph7_text = "Reference";
        //     }
        //     graph7_values_2 = graph_7[i][1];
        //     graph7_values_3 = graph_7[i][2];
        //     graph_7_values.push([graph7_text, graph7_values_2, graph7_values_3]);
        // }


        localStorage.setItem("google_graph1", JSON.stringify(graph_1));
        localStorage.setItem("google_graph2", JSON.stringify(graph_2));
        localStorage.setItem("google_graph3", JSON.stringify(graph_3));
        localStorage.setItem("google_graph4", JSON.stringify(graph_4));
        localStorage.setItem("google_graph5", JSON.stringify(graph_5));
        localStorage.setItem("google_graph6", JSON.stringify(graph_6));
        localStorage.setItem("google_graph7", JSON.stringify(graph_7));

        // localStorage.setItem("google_graph1", JSON.stringify(graph_1_values));
        // localStorage.setItem("google_graph2", JSON.stringify(graph_2_values));
        // localStorage.setItem("google_graph3", JSON.stringify(graph_3_values));
        // localStorage.setItem("google_graph4", JSON.stringify(graph_4_values));
        // localStorage.setItem("google_graph5", JSON.stringify(graph_5_values));
        // localStorage.setItem("google_graph6", JSON.stringify(graph_6_values));
        // localStorage.setItem("google_graph7", JSON.stringify(graph_7_values));

        const chk_response_status = localStorage.getItem("response_status")

        // if (chk_response_status === "200"){
            if(this.state.status=="200"){
            console.log(this.state.status)
            return (
                <div className="container-fluid wrapper">
                    <Header />
                    <div className="container">
                        
                         <h4 className="form_heading">Unsere Produktempfehlungen für Sie</h4>
                        <center><p className="product_heading_top">Wir haben geeignete Strom- und Wärmelösungen für Ihre Immobilie simuliert und verglichen.<br></br>
Als Ergebnis empfehlen wir Ihnen 3 verschiedene Produktkombinationen.</p>
                            </center> 
                        <div className="row product_recommendation">
                            <div className="col-md-4 col-lg-4 col-sm-12">
                                <div className="product_img">
                                    <img className="p_img" src={product_1} responsive />
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-borderless" responsive>
                                        <thead className="product_box_1_2">
                                            <tr>
                                                <th scope="col" className="prod_res">Komponente</th>
                                                <th scope="col" className="prod_res">Produkt</th>
                                                <th scope="col" className="prod_res">Preis</th>
                                            </tr>
                                        </thead>
                                        <tbody id="product_result_1" className="product_box_1_2">
                                            {recommentations_list_1}
                                        </tbody>
                                        <tbody id="product_result_1" className="product_box_1_3">
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Gesamtförderungen</td>
                                                <td className="price_cost">{recommentations_list_1_furthering}</td>
                                            </tr>
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Einmalige Anschaffungskosten</td>
                                                <td className="price_cost">{recommentations_list_1_investCost}</td>
                                            </tr>
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Betriebskosten pro Jahr</td>
                                                <td className="price_cost">{recommentations_list_1_operatingCost}</td>
                                            </tr>
                                        </tbody>
                                        {/* <tbody className="graph_img">
                                            <td></td>
                                            <td><a href="/Economicgraph"><img className="graph_img" src={graph_img_1} circle /></a></td>
                                            <td></td>
                                        </tbody> */}
                                    </table>
                                </div>
    
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12">                           
                                    <div className="product_img">
                                        <img className="p_img" src={product_2} responsive />
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-borderless" responsive>
                                            <thead className="product_box_2_2">
                                                <tr>
                                                    <th scope="col" className="prod_res">Komponente</th>
                                                    <th scope="col" className="prod_res">Produkt</th>
                                                    <th scope="col" className="prod_res">Preis</th>
                                                </tr>
                                            </thead>
                                            <tbody id="product_result_1" className="product_box_2_2">
                                                {recommentations_list_2}
                                            </tbody>
                                            <tbody id="product_result_1" className="product_box_2_3">
                                                <tr>
                                                    {/* <td></td> */}
                                                    <td colspan="2">Gesamtförderungen</td>
                                                    <td className="price_cost">{recommentations_list_2_furthering}</td>
                                                </tr>
                                                <tr>
                                                    {/* <td></td> */}
                                                    <td colspan="2">Einmalige Anschaffungskosten</td>
                                                    <td className="price_cost">{recommentations_list_2_investCost}</td>
                                                </tr>
                                                <tr>
                                                    {/* <td></td> */}
                                                    <td colspan="2">Betriebskosten pro Jahr</td>
                                                    <td className="price_cost">{recommentations_list_2_operatingCost}</td>
                                                </tr>
                                            </tbody>
                                            {/* <tbody className="">
                                                <td></td>
                                                <td> <a href="/Economicgraph" target="_blank"><img className="graph_img" src={graph_img_2} circle /></a></td>
                                                <td></td>
                                                   
                                            </tbody> */}
                                        </table>
                                    </div>
                             
    
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12">
                                <div className="product_img">
                                    <img className="p_img" src={product_3} responsive />
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-borderless" responsive>
                                        <thead className="product_box_3_2">
                                            <tr>
                                                <th scope="col" className="prod_res">Komponente</th>
                                                <th scope="col" className="prod_res">Produkt</th>
                                                <th scope="col" className="prod_res">Preis</th>
                                            </tr>
                                        </thead>
                                        <tbody id="product_result_1" className="product_box_3_2">
                                            {recommentations_list_3}
                                        </tbody>
                                        <tbody id="product_result_1" className="product_box_3_3">
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Gesamtförderungen</td>
                                                <td className="price_cost">{recommentations_list_3_furthering}</td>
                                            </tr>
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Einmalige Anschaffungskosten</td>
                                                <td className="price_cost">{recommentations_list_3_investCost}</td>
                                            </tr>
                                            <tr>
                                                {/* <td></td> */}
                                                <td colspan="2">Betriebskosten pro Jahr</td>
                                                <td className="price_cost">{recommentations_list_3_operatingCost}</td>
                                            </tr>
                                        </tbody>
                                        {/* <tbody className="graph_img">
                                            <td></td>
                                            <td><a href="/Energetic"><img className="graph_img" src={graph_img_3} circle /></a></td>
                                            <td></td>
                                        </tbody> */}
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className="row graph_btn">
                        <div className="col-lg-12"> 
                                <center><a href="/Economicgraph" className="btn btn_next"><i class="fa fa-bar-chart" aria-hidden="true"></i> &nbsp;
Zur Vergleichsübersicht
                                </a></center>
                        </div>
                       
                        <div className="col-lg-12" style={{marginTop:'30px'}}> 
                                <center><button onClick={this.back} className="btn btn_next">
                                <i class="fa fa-angle-left fa-1x" aria-hidden="true"></i>  &nbsp;  Zurück zum Formular</button></center>
                        </div>
                       
                             {/* <center>    </center> */}
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        
        }else if (this.state.status == "400") {
            
            return (
                <div className="container-fluid wrapper">
                    <Header />
                    <div className="container">
                        <div className="row product_recommendation">
                            <div className="col-md-12 col-lg-12 col-sm-12 text-center" style={{marginTop:'30px'}}>
                                {/* <p>{error_values_field}</p> */}
                                <p>{error_values_message}</p>
                                <p>
                                <img src={error_img} responsive className="" id=""/>   
                                </p>
                                <p className="text-center">
                                    <div className="back_btn_form_2">
                                        <button onClick={this.back} className="btn btn_next ">Back to Form </button>
                                    </div>
                                </p>
                               
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }else if (this.state.status == "500") {

            return (
                <div className="container-fluid wrapper">
                    <Header />
                    <div className="container">
                        <div className="row product_recommendation">
                            <div className="col-md-12 col-lg-12 col-sm-12" style={{marginTop:'30px'}}>
                            <p className="text-center">
                                <img src={error_img} responsive className="" id=""/>   
                                </p>
                            <p className="text-center">
                                    <div className="back_btn_form_2">
                                        <button onClick={this.back} className="btn btn_next ">Back to Form </button>
                                    </div>
                            </p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }else{
            return (
                <div className="container-fluid wrapper">
                    <Header />
                    <div className="container">
                        <div className="row product_recommendation">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                            <p className="text-center"> 
                            <img src={img_loading} responsive className="" id="" style={{width:'300px'}} />   
                              
                                </p>
                          
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        

        
    }
}
export default Product;