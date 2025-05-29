import React from 'react';
import { useAuth } from '../../hooks/Hooks';
import Loader from '../../components/Loader/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <Loader></Loader>
    }

    if(!user){
        return <Navigate to={'/login'} state={{from: location.pathname}}></Navigate>
    }

    return children
};

export default PrivateRoute;