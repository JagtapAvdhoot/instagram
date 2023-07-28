import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInKey, signedUserKey } from "../../react-query";
import { setTokenSelector, useAuthStore } from "../../app/store";
import { signIn } from "../../services/auth.service";

const SignInInputs = () => {
  // TODO: change this useState to useRef
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const setToken = useAuthStore(setTokenSelector);
  const queryClient = useQueryClient()
  const { isLoading, isError, error, isSuccess, mutate: signInFunction } = useMutation({
    mutationKey: [signInKey],
    mutationFn: (body) => signIn(body),
    onSuccess: (data) => {
      console.log('SignInInputs.jsx:28', data);
      setToken(data.token)
      queryClient.invalidateQueries([signedUserKey])
      navigate("/", { replace: true });
    },
  })

  const navigate = useNavigate();

  const handlePasswordShow = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignIn = async () => {
    signInFunction({
      usernameOrEmail,
      password,
    })
  };

  return (
    <Box bg="main" color="secondary">
      <Input
        height="10"
        size="sm"
        type="text"
        placeholder="Username, Email or Phone number"
        _placeholder={{ fontSize: "12" }}
        marginY="1"
        marginTop="7"
        onChange={handleUsernameOrEmailChange}
        name="usernameOrEmail"
        value={usernameOrEmail}
      />
      <InputGroup size="md">
        <Input
          height="10"
          size="sm"
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          _placeholder={{ fontSize: "12" }}
          marginY="1"
          onChange={handlePasswordChange}
          name="password"
          value={password}
        />
        <InputRightElement>
          <Button
            h="1.75rem"
            marginTop="1"
            size="sm"
            onClick={handlePasswordShow}
          >
            {isShowPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isError ? (
        <Text marginY="2" fontSize="12" color="red.600">
          {error.message}
        </Text>
      ) : null}
      <Button
        variant="solid"
        bg="blue.400"
        marginTop="3"
        fontSize="12"
        height="8"
        color="white"
        display="block"
        width="full"
        onClick={handleSignIn}
        _hover={{ background: "blue.300" }}
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignInInputs;
