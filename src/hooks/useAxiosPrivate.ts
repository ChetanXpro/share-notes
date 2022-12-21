import { useEffect } from "react";
import { apiPrivateInstance } from "../Api/api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";


const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
const token = auth?.accessToken
  // useEffect(() => {
    const requestIntercept = apiPrivateInstance.interceptors.request.use(
      (config:any) => {
       
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error:any) => Promise.reject(error)
    );

    const responseIntercept = apiPrivateInstance.interceptors.response.use(
      (response:any) => response,
      async (error:any) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiPrivateInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

  //   return () => {
  //     apiPrivateInstance.interceptors.request.eject(requestIntercept);
  //     apiPrivateInstance.interceptors.response.eject(responseIntercept);
  //   };
  // }, [auth, refresh]);

  return apiPrivateInstance;
};

export default useAxiosPrivate;
