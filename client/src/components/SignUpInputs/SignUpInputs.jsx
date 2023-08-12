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
import { useNavigate } from "react-router-dom";

import { setSignedUserSelector, setTokenSelector, useAuthStore } from "../../app/store";
import { signUp } from "../../services/auth.service";
import { signUpKey, signedUserKey } from "../../react-query";
import { getSignedUser } from "../../services/user.service";

const SignUpInputs = ({ children }) => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const fullName = useRef();
	const isShowPassword = useRef(false);

	const setToken = useAuthStore(setTokenSelector);
	const setSignedUser = useAuthStore(setSignedUserSelector);

	const { isLoading, isError, error, isSuccess, mutate: signUpFunction } = useMutation({
		mutationKey: [signUpKey],
		mutationFn: (body) => signUp(body),
		onSuccess: (data) => {
			setToken(data.token);
		},
	});

	const navigate = useNavigate();

	const {isFetching:signedUserLoading} = useQuery({
		queryKey: [signedUserKey],
		queryFn: () => getSignedUser(),
		onSuccess: (data) => {
			setSignedUser(data.user);
			navigate("/", { replace: true });
		},
		enabled: isSuccess
	});

	const handleIsShowPasswordChange = (event) => {
		isShowPassword.current = !isShowPassword;
	};
	const handleSignUp = async () => {
		console.log("SignUpInputs.jsx:70", { username, fullName, email, password });
		signUpFunction({ username, fullName, email, password });
	};

	return (
		<Box bg="main" color="secondary">
			<Input
				size="sm"
				placeholder="Mobile number or Email"
				_placeholder={{ fontSize: "12" }}
				borderRadius="sm"
				marginY="1"
				ref={email}
				// name="email"
				// value={email}
				// onChange={handleEmailChange}
			/>
			<Input
				size="sm"
				placeholder="Full name"
				_placeholder={{ fontSize: "12" }}
				marginY="1"
				ref={fullName}
				// value={fullName}
				// onChange={handleFullNameChange}
				// name="fullName"
			/>
			<Input
				size="sm"
				placeholder="Username"
				_placeholder={{ fontSize: "12" }}
				marginY="1"
				ref={username}
				// value={username}
				// name="username"
				// onChange={handleUsernameChange}
			/>
			<InputGroup size="md">
				<Input
					height="10"
					size="sm"
					type={isShowPassword.current ? "text" : "password"}
					placeholder="Password"
					_placeholder={{ fontSize: "12" }}
					marginY="1"
					ref={password}
					// onChange={handlePasswordChange}
					// name="password"
					// value={password}
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
				isLoading={isLoading || signedUserLoading}
			>
        Sign up
			</Button>
		</Box>
	);
};

export default memo(SignUpInputs);
