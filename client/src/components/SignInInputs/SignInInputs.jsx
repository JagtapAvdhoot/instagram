import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInKey, signedUserKey } from "../../react-query";
import {
  setSignedUserSelector,
  setTokenSelector,
  useAuthStore,
} from "../../app/store";
import { signIn } from "../../services/auth.service";
import { getSignedUser } from "../../services/user.service";

const SignInInputs = () => {
  const usernameOrEmail = useRef("");
  const password = useRef("");
//   const isShowPassword = useRef(false); // not working as expected
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const setToken = useAuthStore(setTokenSelector);
  const setSignedUser = useAuthStore(setSignedUserSelector);
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    mutate: signInFunction,
  } = useMutation({
    mutationKey: [signInKey],
    mutationFn: (body) => signIn(body),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });

  const { isFetching: signedUserLoading } = useQuery({
    queryKey: [signedUserKey],
    queryFn: () => getSignedUser(),
    onSuccess: (data) => {
      setSignedUser(data.user);
      navigate("/", { replace: true });
    },
    enabled: isSuccess,
  });

  const handlePasswordShow = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSignIn = async () => {
    signInFunction({
      usernameOrEmail: usernameOrEmail.current.value,
      password: password.current.value,
    });
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
        ref={usernameOrEmail}
      />
      <InputGroup size="md">
        <Input
          height="10"
          size="sm"
          type={isShowPassword ? "text" : "password"}
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
