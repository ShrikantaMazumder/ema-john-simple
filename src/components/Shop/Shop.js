import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(() =>{
        fetch('https://fierce-lowlands-66823.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    },[]);

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if (products.length > 0) {
            const previousCart = productKeys.map(key => {
                const product = products.find(product => product.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(previousCart);
        }
    },[])

    const handleAddProduct = (product) => {
        const toBeAdd = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdd);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdd);
            newCart = [...others,sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count);
    }
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product
                            key={product.key}
                            showAddToCart={true}
                             product={product}
                             handleAddProduct={handleAddProduct}
                             >

                             </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="main-button">Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;