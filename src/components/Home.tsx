import { Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
// import { getUser } from "../Api/api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const apiPrivateInstance = useAxiosPrivate()
 
  
   const getUser = async ()=>{
    try {
     const request = await  apiPrivateInstance.get('/user')
     return request?.data
    } catch (err) {
      const error = err as AxiosError;
      return Promise.reject(error.response);
      
    }
  
  }

  
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery("user", getUser);
  console.log(data);
  const loading = () => {
    if (isLoading) {
      return <Spinner />;
    } else {
      return true;
    }
  };

  
  return (
    <div className="bg-gray-200">
      {!isLoading ? (
        <ol>
          {data && data.map((item: object) => (
            <li key={item._id}>{item.username}</li>
          ))}
        </ol>
      ):<Spinner/>}
    </div>
  );
};

export default Home;
