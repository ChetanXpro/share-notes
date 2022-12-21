import { Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { login } from "../Api/api";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";


const Login = () => {
  const [email, setEmail] = useState("");
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { setAuth ,setUser} = useAuth();
  const [success,setSuccess] = useState<boolean>(false)
  const [password, setPassword] = useState("");
 
  // const navigate = Navigate()

  const queryClient = useQueryClient();


  const { isLoading, isError, error, mutate } = useMutation(login, {
    onSuccess: (data) => {
      // Here we can invalidate a cache and refetch a query api again
      //queryClient.invalidateQueries('todos')
    
      localStorage.setItem('jwt',data.accessToken)
      setAuth(data);
      setSuccess(true)
      const userDetails = jwtDecode(data?.accessToken)
      setUser(userDetails)
     
      setTimeout(() => {
        
        navigate(from, { replace: true });
      }, 300);
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      username: email,
      password,
    };
    mutate(payload);
  };
  return (
    <Flex h="100vh" bg={"#2b2b2b"} justifyContent="center">
      <Flex
        marginX="6"
        marginY={"6"}
        w={[300, 300, 400]}
        flexDirection={"column"}
        mt={'36'}
      >
  
        <form onSubmit={handleSubmit}>
         
        
          <Text
            textAlign={"center"}
            color="white"
            fontFamily={'heading'}
            fontSize="2xl"
            mb={"6"}
          >
            Login to your account
          </Text>
          <p style={{textAlign:'center',marginBottom:'12px',marginTop:'4px',color:'red'}} >
          {isError ? `${error?.data?.message}`:'' }
              </p>
          <FormControl mb={"4"} isInvalid={false}>
          
            <Input
              type={"email"}
              h="10"
              color={"whiteAlpha.900"}
              autoComplete="true"
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="email"
            />
            {/* {true && (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )} */}
          </FormControl>
          <FormControl isInvalid={false}>
            <Input
              type={"password"}
              h={"10"}
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={"whiteAlpha.900"}
              placeholder="password"
            />
            {/* {true && (
        <FormErrorMessage>Password should be long .</FormErrorMessage>
      )} */}
          </FormControl>
         
          

          <Button
            isLoading={isLoading}
            loadingText="Signing in"
            width={"full"}
            h='12'
            colorScheme={`${success ? 'green' : 'teal'}`}
            mt={"8"}
            onClick={handleSubmit}
          >
           {success ? 'Succesfully logined' :'Sign in'}
          </Button>
        </form>
        <Flex mt={'4'} justifyContent='center'>

        <span style={{textAlign:'center',marginRight:'6px',color:'wheat'}}>Don't have an account ? </span>
        <Link className="text-blue-400" to={'/sign_up'}>Sign up</Link>
        </Flex>

      </Flex>
    </Flex>
  );
};

export default Login;
