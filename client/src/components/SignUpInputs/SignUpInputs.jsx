import {
  Button,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import React, { memo, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

import {
  setSignedUserSelector,
  setTokenSelector,
  useAuthStore,
} from "../../app/store";
import { signUp } from "../../services/auth.service";
import { signUpKey, signedUserKey } from "../../react-query";
import { getSignedUser } from "../../services/user.service";

const SignUpInputs = ({ children }) => {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const fullName = useRef("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const setToken = useAuthStore(setTokenSelector);
  const setSignedUser = useAuthStore(setSignedUserSelector);

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    mutate: signUpFunction,
  } = useMutation({
    mutationKey: [signUpKey],
    mutationFn: (body) => signUp(body),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });

  const navigate = useNavigate();

  const { isFetching: signedUserLoading } = useQuery({
    queryKey: [signedUserKey],
    queryFn: () => getSignedUser(),
    onSuccess: (data) => {
      setSignedUser(data.user);
      navigate("/", { replace: true });
    },
    enabled: isSuccess,
  });

  const handleIsShowPasswordChange = (event) => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSignUp = async () => {
    signUpFunction({
      username: username.current.value,
      fullName: fullName.current.value,
      email: email.current.value,
      password: password.current.value,
    });
  };

  const inputsMap = [
    {
      placeholder: "Enter Email",
      ref: email,
    },
    {
      placeholder: "Enter Full Name",
      ref: fullName,
    },
    {
      placeholder: "Enter Username",
      ref: username,
    },
  ];

  return (
    <Box bg="main" color="secondary">
      {inputsMap.map((item) => (
        <Input
          size="sm"
          placeholder={item.placeholder}
          _placeholder={{ fontSize: "12" }}
          borderRadius="sm"
          marginY="1"
          key={item.placeholder}
          ref={item.ref}
        />
      ))}
      <InputGroup size="md">
        <Input
          height="10"
          size="sm"
          type={isShowPassword.current ? "text" : "password"}
          placeholder="Password"
          _placeholder={{ fontSize: "12" }}
          marginY="1"
          ref={password}
        />
        <InputRightElement>
          <Button
            h="1.75rem"
            marginTop="1"
            size="sm"
            onClick={handleIsShowPasswordChange}
          >
            {isShowPassword.current ? "Hide" : "Show"}
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
