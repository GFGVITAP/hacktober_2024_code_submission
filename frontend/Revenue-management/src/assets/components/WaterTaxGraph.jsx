import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const data = [
  {
    name: '0',
    WaterTax: 1000,
   
    amt: 2400,
  },
  {
    name: '2021',
    WaterTax: 3000,
   
    amt: 2210,
  },
  {
    name: '2022',
    WaterTax: 6000,
  
    amt: 2290,
  },
  {
    name: '2023',
    WaterTax: 500,
   
    amt: 2000,
  },
  {
    name: '2024',
    WaterTax: 1890,

    amt: 2181,
  },
  {
    name: '2025',
    
  },

];  

export default class Example extends PureComponent {


  componentDidMount() {
    // Fetch data from local data.json file when component mounts
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        // Process the fetched data if needed
        const processedData = data.map(user => ({
          name: user.userId,
          propertyTax: user.propertyTax,
          waterTax: user.waterTax,
          garbageTax: user.garbageTax,
          others: user.others,
          balance: user.balance,
          rewards: user.rewards,
          dueTaxes: user.dueTaxes,
        }));
        // Update the state with the processed data
        this.setState({ data: processedData });
      })
      .catch(error => {
        console.error('Error:', error);
        this.notifyA('Sucessfully fetched user details .');
      });
  }

  // Toast notification functions
  notifyA = (msg) => toast.success(msg);
  notifyB = (msg) => toast.error(msg);


  handleChange = (event) => {
    // Handle the change event for the input field
    console.log("Input value changed to:", event.target.value);
  };

  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Line type="monotone" dataKey="WaterTax" stroke="#82ca9d" />
        </LineChart>
        <input
          type="text"
          defaultValue={"test"}
          onClick={this.postData}
          onChange={this.handleChange}
        />
      </ResponsiveContainer>
    );
  }
}
