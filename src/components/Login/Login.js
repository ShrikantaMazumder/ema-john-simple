import React, { useReducer } from 'react';
import './Login.css';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    //Handle singnin
    const handleSingIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
        })
    }
    //handle signout
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        })
    }
    return (
        <div>
            {
                auth.user ? <button onClick={auth.signOut}>Sign Out</button>
                :
                <button className="btn btn-primary" onClick={handleSingIn}>Signin with google</button>}
        </div>
    );
};

export default Login;