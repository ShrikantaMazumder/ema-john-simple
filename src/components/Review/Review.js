import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

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
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;