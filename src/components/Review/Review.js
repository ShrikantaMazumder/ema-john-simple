import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    

    //Handle place order
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[]);

    let thankYou;

    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/> ;
    }
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
                    thankYou
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