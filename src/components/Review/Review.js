import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart,setCart] = useState([]);
    const auth = useAuth();

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:2500/get-product-by-key',{
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then(res => res.json())
        .then(data => {
            const cartProducts = productKeys.map(key => {
                const product = data.find(product => product.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProducts);
        })
        
    },[]);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem 
                                            handleRemoveItem={handleRemoveItem} 
                                            key={product.key} 
                                            product={product}>
                                        </ReviewItem>)
                }
                
                {
                    !cart.length && <h3>Nothing found in review</h3>
                }
            </div>

            
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user ?
                            <button className="main-button">Proceed Checkout</button>
                            :
                            <button className="main-button">Login to proceed</button>
                        }
                    </Link>
                    
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;