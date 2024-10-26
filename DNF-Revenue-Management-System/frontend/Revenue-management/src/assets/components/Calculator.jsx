import React, { useState } from 'react';
import "./Calculator.css";
import PropertyTaxCalculator from './PropertyTaxCalculator';
import WaterTax from './WaterTax';

const Calculator = () => {
  const [showPropertyTaxCalculator, setShowPropertyTaxCalculator] = useState(false);
  const [showWaterTax, setShowWaterTax] = useState(false);

  const handlePropertyTaxButtonClick = () => {
    setShowPropertyTaxCalculator(true);
    setShowWaterTax(false);
  };

  const handleWaterTaxButtonClick = () => {
    setShowWaterTax(true);
    setShowPropertyTaxCalculator(false);
  };

  return (
    <div className='calculator-container-main'>
      <div className="calculator-container">
        <h1>Calculators</h1>
        <div className="flex-container">
          <div className="button-group">
            <button 
              className="calculator-button" 
              onClick={handlePropertyTaxButtonClick}
              style={{
                marginRight: '20px',
                transition: 'margin-right 0.5s ease-in-out'
              }}
            >
              Property Tax Calculator
            </button>
            <button 
              className="calculator-button" 
              onClick={handleWaterTaxButtonClick}
              style={{
                marginRight: '20px',
                transition: 'margin-right 0.5s ease-in-out'
              }}
            >
              Water Tax Calculator
            </button>
            <button 
              className="calculator-button"
              style={{
                marginRight: '0px',
                transition: 'margin-right 0.5s ease-in-out'
              }}
            >
              Other Calculators
            </button>
          </div>
        </div>
      </div>
      
      {showPropertyTaxCalculator && (
        <div 
          className="property-tax-calculator-container" 
          style={{
            animation: 'fadeIn 0.5s ease-in-out'
          }}
        >
          <PropertyTaxCalculator />
        </div>
      )}
      
      {showWaterTax && (
        <div 
          className="water-tax-container" 
          style={{
            animation: 'fadeIn 0.5s ease-in-out'
          }}
        >
          <WaterTax />
        </div>
      )}
    </div>
  );
};

export default Calculator;