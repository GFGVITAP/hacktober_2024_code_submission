import React, { useState } from 'react';
import "./WaterTax.css"

const WaterTaxCalculator = () => {
    const handlePropertyTaxButtonClick = (event) => {
        event.preventDefault();
        setShowPropertyTaxCalculator(true);
        setShowWaterTax(false);
      };
      
      const handleWaterTaxButtonClick = (event) => {
        event.preventDefault();
        setShowWaterTax(true);
        setShowPropertyTaxCalculator(false);
      };
  const [waterConsumption, setWaterConsumption] = useState('');
  const [noOfDays, setNoOfDays] = useState(1);
  const [waterTax, setWaterTax] = useState(0);

  const calculateWaterTax = () => {
    const consumption = parseFloat(waterConsumption);
    if (isNaN(consumption)) {
      alert('Please enter a valid water consumption');
      return;
    }
    const days = parseInt(noOfDays);
    if (isNaN(days)) {
      alert('Please enter a valid number of days');
      return;
    }
    const waterTaxAmount = consumption * days * 0.125;
    setWaterTax(waterTaxAmount);
  };

  return (
    <div className="water-tax-calculator">
      <h2>Water Tax Calculator</h2>
      <form>
        <div className="form-group">
          <label htmlFor="waterConsumption">Water Consumption (in gallons) *</label>
          <input type="text" id="waterConsumption" className="form-control" value={waterConsumption} onChange={e => setWaterConsumption(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="noOfDays">No of Days *</label>
          <input type="number" id="noOfDays" className="form-control" value={noOfDays} onChange={e => setNoOfDays(e.target.value)} />
        </div>
        
        <input type="text" value={"Calculate"} onClick={calculateWaterTax} />
        <button className="btn btn-secondary">Cancel</button>
      </form>
      <div className="output-box">
        <p>Water Tax: {waterTax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default WaterTaxCalculator;