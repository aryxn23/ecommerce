import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Successful/successful.css";

const Successful = () => {

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (countdown === 0) {
    navigate("/");
  }

  return (
    <div className="payment-confirmation-container">
      <div className="payment-confirmation">
        <i className="bi bi-check-circle mb-3" style={{ fontSize: '60px', color: '#4caf50' }}></i>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>Order ID: ABC123XYZ</p>
        {/* Text indicating redirect and countdown timer */}
        <p>Redirecting to home page in <h7 className="countdown">{countdown} </h7> seconds...</p>

      </div>
    </div>
  );
};

export default Successful;


