import React from 'react';
import './Header.css'
import logo from '../../images/logo.png';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
    const auth = useAuth();
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user ?
                    <span>
                        <span style={{color:'yellow'}}>Welcome,{auth.user.name}</span>
                        <a href="/login">Logout</a>
                    </span>
                    :
                    <Link to="/login">Signin</Link>
                }
            </nav>
        </div>
    );
};

export default Header;