import React, { useState } from 'react';
import './Shipment.css';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipment = () => {
  const [shipInfo,setShipInfo] = useState(null);
  const [orderId,setOrderId] = useState(null)

  const stripePromise = loadStripe('pk_test_pO5hGePb6m1AUqxRUpOS3oqD00dBLzVK36');
  const { register, handleSubmit, watch, errors } = useForm()
  const auth = useAuth();
  const onSubmit = data => {
    setShipInfo(data);
  }

  //place order
  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDetail = {
      email:auth.user.email,
      cart:savedCart,
      shipment: shipInfo,
      payment:payment,
      }
    fetch('http://localhost:2500/place-order',{
      method: "POST",
      body: JSON.stringify(orderDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(order => {
      setOrderId(order._id);
     processOrder();
     
    })
  }
  return (
    <div className="container">
      <div className="row">
        <div style={{display: shipInfo && 'none'}} className="col-md-6">
          <h3>Shipping Information</h3>
          <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" ref={register({ required: true })} defaultValue={auth.user.name} placeholder="Name"/>
            {errors.name && <span className="error">This field is required</span>}

            <input name="email" ref={register({ required: true })} defaultValue={auth.user.email} placeholder="Email"/>
            {errors.email && <span className="error">This field is required</span>}

            <input name="address1" ref={register({ required: true })} placeholder="Address 1"/>
            {errors.address1 && <span className="error">This field is required</span>}

            <input name="address2" ref={register()} placeholder="address 2"/>
            {errors.address2 && <span className="error">This field is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Phone"/>
            {errors.phone && <span className="error">This field is required</span>}

            <input name="city" ref={register({ required: true })} placeholder="City"/>
            {errors.city && <span className="error">This field is required</span>}

            <input name="country" ref={register({ required: true })} placeholder="Country"/>
            {errors.country && <span className="error">This field is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
            {errors.zipcode && <span className="error">This field is required</span>}
            
            <input type="submit" />
          </form>
        </div>
        <div style={{marginTop: '200px', display: shipInfo ? 'block' : 'none'}} className="col-md-6">
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br/>
          {
            orderId && 
            <div>
              <h3>Thank you for shopping with us</h3>
              <p>Your order id is: {orderId}</p>
            </div>
            
          }
        </div>
      </div>
    </div>
   )
};

export default Shipment;