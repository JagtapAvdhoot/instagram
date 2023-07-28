import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";

import InstagramLogo from "../../components/InstagramLogo/InstagramLogo";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { themeSelector, tokenSelector, useAuthStore, useGlobalStore } from "../../app/store";

const Auth = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore(tokenSelector);
  const theme = useGlobalStore(themeSelector);

  const handleAuthChange = useCallback(
    () => setIsSignInActive(!isSignInActive),
    [isSignInActive]
  );

  useEffect(() => {
    if (token !== null) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, token]);

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        overflowX="hidden"
        bg="main"
        color="secondary"
        minHeight="100vh"
      >
        <Flex
          gap="2"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="full"
          height="auto"
        >
          <Box
            width="80"
            height="auto"
            border="1px"
            borderColor="border"
            paddingY="3"
            marginY="4"
            textAlign="center"
            paddingX="8"
          >
            <InstagramLogo
              height="40px"
              style={{ margin: "30px auto 0" }}
              color={theme === "light" ? "#000" : "#fff"}
            />
            {isSignInActive ? <SignIn /> : <SignUp />}
          </Box>
        </Flex>

        <Flex
          width="80"
          height="10vh"
          border="1px"
          borderColor="border"
          justifyContent="center"
          alignItems="center"
        >
          <Center fontSize="12" height="fit-content">
            {isSignInActive
              ? "Don't have an account?"
              : "Already have an account"}
            <Text cursor="pointer" color="blue.400" onClick={handleAuthChange}>
              &nbsp;{isSignInActive ? "Sign up" : "Sign in"}
            </Text>
          </Center>
        </Flex>

        <AuthFooterLinks />
      </Flex>
    </>
  );
};

const AuthFooterLinks = memo(() => {
  const footerLinkOne = [
    "Meta",
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Top accounts",
    "Locations",
    "Instagram Lite",
    "Contact uploading and non-users",
    "Meta Verified",
  ];

  return (
    <Flex
      gap="2"
      width="96"
      wrap="wrap"
      wordBreak="keep-all"
      justifyContent="center"
      marginY="7"
    >
      {footerLinkOne.map((item, index) => (
        <Link
          href={`/${item}`} //not working
          cursor="pointer"
          key={index}
          _hover={{
            textDecoration: "underline",
          }}
          fontSize="10"
        >
          {item}
        </Link>
      ))}
    </Flex>
  );
});

export default memo(Auth);
