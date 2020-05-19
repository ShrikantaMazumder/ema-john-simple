import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
    const [paymentError,setPaymentError] = useState(null);
    const [paymentCompleted,setPaymentCompleted] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log("Stripe",error,paymentMethod)
    if(error){
        setPaymentError(error.message);
        setPaymentCompleted(null);
    }else{
        setPaymentCompleted(paymentMethod);
        const payment = {id:paymentMethod.id,last4:paymentMethod.last4}
        props.handlePlaceOrder(payment);
        setPaymentError(null)
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color:"red"}}>{paymentError}</p>
      }
      {
          paymentCompleted && <p style={{color:'green'}}>Payment Completed</p>
      }
    </form>
  );
};

export default CheckoutForm;