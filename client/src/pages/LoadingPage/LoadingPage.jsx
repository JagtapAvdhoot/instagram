import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

import InstagramLogo from "../../components/InstagramLogo/InstagramLogo";

const LoadingPage = () => {
	const theme = localStorage.getItem("ig_theme");
	return (
		<VStack
			justifyContent="center"
			alignItems="center"
			bg="main"
			color="secondary"
			width="full"
			height="100vh"
		>
			{/* <Image src={instagramLogo} height="36" /> */}
			<InstagramLogo
				color={theme === "light" ? "#000" : "#fff"}
				style={{ height: "120px" }}
			/>
			<Text>App Clone Loading</Text>
		</VStack>
	);
};

export default LoadingPage;
