import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import jwtDecode from "jwt-decode";


const RequireAuth = () => {
  const {auth,setUser} = useAuth();
  // const token = localStorage.getItem('jwt')
  const navigate = useNavigate()
  const token = auth?.accessToken
  // const data = jwtDecode(response?.data?.accessToken)
  const decode =  token ? jwtDecode(token) : null
  // setUser(dec)
  // console.log(auth)
 
  return token ? <Outlet/> : <Navigate to={'/sign_in'} />
}

export default RequireAuth