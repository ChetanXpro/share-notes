import jwtDecode from "jwt-decode";
import { apiInstance } from "../Api/api";
import useAuth from "./useAuth";



const useRefreshToken = () => {
  const { setAuth,setUser } = useAuth();


  

  const refresh = async () => {
   
    const response = await apiInstance.get("/auth/refresh");
    console.log(response)
    setAuth(response.data);
    // setUser(jwtDecode(response.data))
    const token = jwtDecode(response?.data?.accessToken)
    console.log(token)
    setUser(token)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
