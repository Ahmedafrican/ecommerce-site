import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'

export default function ProtectedRoute({children}) {
 let {userIsLoggedIn} =useContext(AuthContext)
 console.log(userIsLoggedIn);

    if(localStorage.getItem('token')){
        return children
 }
// if(userIsLoggedIn){
//    return children
// }
 else {
    return <Navigate to={'/login'}/>
 }
}
