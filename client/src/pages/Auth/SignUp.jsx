import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import SignUpInputs from "../../components/SignUpInputs/SignUpInputs";

const SignUp = () => {
	return (
		<>
			<Text color="grey" marginTop="3" fontSize="14">
        Sign up to see photos and videos from your friends.
			</Text>
			<Button
				variant="solid"
				bg="blue.400"
				marginTop="3"
				fontSize="12"
				height="8"
				color="white"
				width="full"
				_hover={{ background: "blue.300" }}
				leftIcon={
					<AiFillFacebook
						// style={{ fill:'#fff'}}
					/>
				}
			>
        Login with facebook
			</Button>
			<Flex marginY="3" alignItems="center">
				<Divider bgColor="cyan" />
				<Text fontSize="sm">OR</Text>
				<Divider bgColor="cyan" />
			</Flex>

			<SignUpInputs>
				<Text color="grey" fontSize="10" marginTop="3">
          People who use our service may have uploaded your contact information
          to Instagram. Learn more
				</Text>
				<Text color="grey" fontSize="10" marginTop="3">
          By signing up, you agree to our Terms, Privacy Policy and Cookies
          Policy.
				</Text>
			</SignUpInputs>
		</>
	);
};

export default SignUp;
