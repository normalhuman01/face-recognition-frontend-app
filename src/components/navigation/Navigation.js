import React from 'react'
import './Navigation.css';

const Navigation = ({ isSignedIn, onRouteChange }) =>{
    if(isSignedIn){
        return(
            <nav>
                <p
                    className='signOut'
                    onClick = {() => onRouteChange('signIn')}>Sign Out</p>
            </nav>
        )
    }
    else{
        return(
            <nav>
            <p
            className='signOut'
            onClick = {() => onRouteChange('signIn')}>Sign In</p>
            <p
            className='signOut'
            onClick = {() => onRouteChange('register')}>Register</p>
            </nav>
        );
    }
}

export default Navigation;
