import React from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const auth = useAuth();
    const onSubmit = data => { 
      //TODO: move this after payment
      const savedCart = getDatabaseCart();
      const orderDetail = {email:auth.user.email,cart:savedCart}
      fetch('http://localhost:2500/place-order',{
        method: "POST",
        body: JSON.stringify(orderDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Order Placed",data);
        alert("Order placed successfully.");
        processOrder();
      })
    
    }
    

  return (
    <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register({ required: true })} defaultValue={auth.user.name} placeholder="Name"/>
      {errors.name && <span className="error">This field is required</span>}

      <input name="email" ref={register({ required: true })} defaultValue={auth.user.email} placeholder="Email"/>
      {errors.email && <span className="error">This field is required</span>}

      <input name="address1" ref={register({ required: true })} placeholder="Address 1"/>
      {errors.address1 && <span className="error">This field is required</span>}

      <input name="address2" ref={register()} placeholder="address 2"/>
      {errors.address2 && <span className="error">This field is required</span>}

      <input name="city" ref={register({ required: true })} placeholder="City"/>
      {errors.city && <span className="error">This field is required</span>}

      <input name="country" ref={register({ required: true })} placeholder="Country"/>
      {errors.country && <span className="error">This field is required</span>}

      <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
      {errors.zipcode && <span className="error">This field is required</span>}
      
      <input type="submit" />
    </form>
   )
};

export default Shipment;