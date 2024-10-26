import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const data = [
  {
    name: '0',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2021',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '2022',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2023',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '2024',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '2025',
    
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
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
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
