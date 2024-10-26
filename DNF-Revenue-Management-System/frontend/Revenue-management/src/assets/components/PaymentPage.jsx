import React, { useState, useEffect } from 'react';
import "./PaymentPage.css"
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [balance, setBalance] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [totalTaxPaid, setTotalTaxPaid] = useState(0);
  const [dues, setDues] = useState(0);
  const [ptsEarned, setPtsEarned] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const navigate = useNavigate(); // Define the navigate function

  const handlePayment = () => {
    // Payment logic here
  };

  const calculateTax = () => {
    // Tax calculation logic here
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    const payButton = document.getElementById('payButton');
    payButton.onclick = function () {
      var options = {
        "key": "rzp_test_moY72rUjlJiM5d",
        "amount": 50000, // Amount in paise (INR 500)
        "currency": "INR",
        "name": "Your Company Name",
        "description": "Purchase Description",
        "image": "https://your-company-logo-url.com/logo.png",
        "handler": function (response){
          alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
        },
        "prefill": {
          "name": "Your Name",
          "email": "your.email@example.com",
          "contact": "9999999999"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp = new Razorpay(options);
      rzp.open();
    };
  }, []);

  return (
    <div className="payment-page">
      <header className="page-header">
        <h1>Tax Payment Portal</h1>
      </header>
      <main className="page-content">
        <section className="account-summary">
          <h2>Your Account Summary</h2>
          <div className="summary-item">
            <label>Balance:</label>
            <span>{-10000}</span>
          </div>
          <div className="summary-item">
            <label>Payment Status:</label>
            <span>{paymentStatus}</span>
          </div>
          <div className="summary-item">
            <label>Total Tax Paid:</label>
            <span>{100203}</span>
          </div>
          <div className="summary-item">
            <label>Dues:</label>
            <span>{4000}</span>
          </div>
          <div className="summary-item">
            <label>Points Earned:</label>
            <span>{100}</span>
          </div>
        </section>
        <section className="payment-actions">
          <h2>Payment Actions</h2>
          <button id="payButton" className='mr-4'>Pay</button>
          <button onClick={() => navigate("/calculator")} className='calculate-tax'>Calculate Tax</button>
        </section>
        <section className="payment-history">
          <h2>Payment History</h2>
          <div> "paymentDate": "2023-08-15T00:00:00Z",
          "paymentAmount": 250,
          "paymentMethod": "credit card"</div>
          <div>
          "paymentDate": "2023-09-15T00:00:00Z",
          "paymentAmount": 1700,
          "paymentMethod": "debit card" </div>
          <ul>
            {paymentHistory.map((payment, index) => (
              <li key={index}>
                {/* Display payment details here */}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="page-footer">
        <p> 2023 [Your Government Agency]</p>
      </footer>
    </div>
  );
};

export default PaymentPage;