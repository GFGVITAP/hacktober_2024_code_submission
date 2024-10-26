import React, { useState } from 'react';
import "./PropertyCalculator.css";

const PropertyTaxCalculator = () => {
  const [propertyArea, setPropertyArea] = useState('');
  const [noOfFloors, setNoOfFloors] = useState(1);
  const [tax, setTax] = useState(0);

  const calculateTax = () => {
    const area = parseFloat(propertyArea);
    if (isNaN(area)) {
      alert('Please enter a valid property area');
      return;
    }
    const floors = parseInt(noOfFloors);
    if (isNaN(floors)) {
      alert('Please enter a valid number of floors');
      return;
    }
    const taxAmount = area * floors * 80 * 0.125;
    setTax(taxAmount);
  };

  return (
    <div className="property-tax-calculator">
      <h2>Property Tax Calculator</h2>
      <form>
        <div className="form-group">
          <label htmlFor="propertyType">Property Type *</label>
          <select id="propertyType" className="form-control">
            <option value="">--Select--</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Institutional">Institutional</option>
            <option value="Government">Government</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Educational">Educational</option>
            <option value="Recreational">Recreational</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="propertyArea">Property Area *</label>
          <input type="text" id="propertyArea" className="form-control" value={propertyArea} onChange={e => setPropertyArea(e.target.value)} />
        </div>
     
        <h3>Floor-Wise Detail</h3>
        <table className="table">
          <thead>
            <tr>
              <th>No of floors</th>
              <th>Property Area *</th>
              <th>Covered Area *</th>
              <th>Usage *</th>
              <th>Rebate *</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="number" className="form-control" value={noOfFloors} onChange={e => setNoOfFloors(e.target.value)} />
              </td>
              <td>
                <input type="text" className="form-control" placeholder="Enter Property Area (in sqft)" value={propertyArea} onChange={e => setPropertyArea(e.target.value)} />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <select className="form-control">
                  <option value="Self Occupied">Self Occupied</option>
                  {/* Add other usage options here */}
                </select>
              </td>
              <td>
                <select className="form-control">
                  <option value="No Rebate">No Rebate</option>
                  {/* Add other rebate options here */}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <input type="text" value={"Calculate"} onClick={calculateTax} />
        <button className="btn btn-secondary">Cancel</button>
      </form>
      <div className="output-box">
        <p>Tax: {tax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PropertyTaxCalculator;