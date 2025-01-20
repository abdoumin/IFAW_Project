import React, { Component } from 'react'
import { Route, Navigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {useContext} from 'react'


const AuthenticatedRoute = ()=>{

    const {user} = useContext(AuthContext);
    if(user)
    {
        return <Route {...this.props} />
    } 
    else{
        return <Navigate to="/login" />
    }
}

export default AuthenticatedRoute