import {
  Button,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { setTokenSelector, useAuthStore } from "../../app/store";
import { signUp } from "../../services/auth.service";
import { signUpKey, signedUserKey } from "../../react-query";

const SignUpInputs = ({ children }) => {
  // TODO: change this useState to useRef
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const setToken = useAuthStore(setTokenSelector);
  const queryClient = useQueryClient()
  const { isLoading, isError, error, isSuccess, mutate: signUpFunction } = useMutation({
    mutationKey: [signUpKey],
    mutationFn: (body) => signUp(body),
    onSuccess: (data) => {
      setToken(data.token)
      queryClient.invalidateQueries([signedUserKey])
      navigate("/", { replace: true });
    },
  })

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleIsShowPasswordChange = (event) => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSignUp = async () => {
    signUpFunction({ username, fullName, email, password })
  };

  return (
    <Box bg="main" color="secondary">
      <Input
        size="sm"
        placeholder="Mobile number or Email"
        _placeholder={{ fontSize: "12" }}
        borderRadius="sm"
        marginY="1"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      <Input
        size="sm"
        placeholder="Full name"
        _placeholder={{ fontSize: "12" }}
        marginY="1"
        name="fullName"
        value={fullName}
        onChange={handleFullNameChange}
      />
      <Input
        size="sm"
        placeholder="Username"
        _placeholder={{ fontSize: "12" }}
        marginY="1"
        value={username}
        name="username"
        onChange={handleUsernameChange}
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
            onClick={handleIsShowPasswordChange}
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

      {children}

      <Button
        variant="solid"
        bg="blue.400"
        marginTop="3"
        fontSize="12"
        height="8"
        color="white"
        display="block"
        width="full"
        _hover={{ background: "blue.500" }}
        onClick={handleSignUp}
        isLoading={isLoading}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default memo(SignUpInputs);
