
import Chart from './Chart';
import Piechart from "./Piechart1";
import "./User-dashboard.css"

import BarChart from "./WaterTaxGraph"
import PropertyChart from "./PropertyTaxGraph"

export default function DashBoard() {
  return (
    <>

      <div className="Dashboard-container1">
        <div className="upper-dashboard " id='bdr'>
          <div className="status-display-container" id='bdr'>
            <div className="status-display" id='bdr'>
              <div className="status-box sb-1"  id='bdr'>Balance: <b>-10000</b> </div>
              <div className="status-box sb-2"  id='bdr'>Payment Status : <br /> <b> pending</b> </div>
              <div className="status-box sb-3" id='bdr'> Your Assets</div>
            </div>
            <div className="line-graph" id='bdr'>
              <Chart />
            </div>
          </div>
          <div className="payment-display" id='bdr'>
            <div className='tax-paid'>
              <div>
                Total Tax Paid till now <div className='piechart'><Piechart></Piechart></div>
              </div>
              <div>
                <b>100203</b>
              </div> </div>
          <div className="tax-paid" id='bdr'>
          <div>
              Dues : 4000
            </div>
            <div>
            <button className='btn btn-danger paynowsty'>Paynow</button>
            </div>
          </div>
          <div className='tax-paid' id='bdr'>
          <div>Pts Earned 100 </div>
          <div><button>Reedem NOW</button></div>
          </div>

          </div>
        </div>
        <div className="lower-dashboard" id='bdr'>
        <div className='Water-Tax' id='bdr'>
            <span>Water Tax</span>
            <BarChart></BarChart>
          </div>
          <div className='ld-status-box status-box'  id='bdr'>Payment history

          </div>
          
          <div className='Property-Tax' id='bdr'>
            <span>Property Tax</span>
            <PropertyChart></PropertyChart>
          </div>
         
        </div>
      </div>
    </>
  )
}