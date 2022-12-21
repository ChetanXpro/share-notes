import { Input } from '@chakra-ui/react'
import React from 'react'
import { apiInstance } from '../Api/api'

const Setting = () => {
   const getUser = async ()=>{
    try {
     const request = await  apiInstance.get('/user/upload')
     return request?.data
    } catch (err) {
      const error = err ;
      return Promise.reject(error.response);
      
    }
  
  }
  
  
  
  return (
    <div>
      <img src="data:image/gif;base64,U2NyZWVuc2hvdCBmcm9tIDIwMjItMTItMTggMTktMjctNTIucG5n"alt="" />
    </div>
  )
}

export default Setting