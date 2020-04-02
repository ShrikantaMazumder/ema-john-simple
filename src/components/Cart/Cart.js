import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, product) => total+product.price * product.quantity,0)

    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }else if (totalPrice > 15) {
        shipping = 4.99;
    }else if (totalPrice) {
        shipping = 12.00;
    }

    const tax = (totalPrice / 10);
    const grandTotal = totalPrice + shipping + tax;
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Total: {(totalPrice).toFixed(2)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax + VAT: {tax.toFixed(2)}</p>
            <p>Grand Total: {grandTotal.toFixed(2)}</p>
            <br/>
            {props.children}
            
        </div>
    );
};

export default Cart;