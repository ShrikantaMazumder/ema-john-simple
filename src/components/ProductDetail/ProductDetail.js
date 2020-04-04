import React, { useState, useEffect } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState(null);

    useEffect(()=>{
        fetch('https://fierce-lowlands-66823.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    },[])

    return (
        <div>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;