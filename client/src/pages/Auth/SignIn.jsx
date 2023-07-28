import { Box, Button, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React, { memo, useCallback } from "react";
import { AiFillFacebook } from "react-icons/ai";

import SignInInputs from "../../components/SignInInputs/SignInInputs";

const SignIn = () => {
  return (
    <>
      <SignInInputs />

      <Flex marginY="5" alignItems="center">
        <Divider bgColor="cyan" />
        <Text fontSize="sm">OR</Text>
        <Divider bgColor="cyan" />
      </Flex>

      <Button
        variant="ghost"
        fontSize="15"
        color="blue.700"
        width="full"
        _hover={{ background: "none" }}
        leftIcon={<AiFillFacebook />}
      >
        Login with facebook
      </Button>

      <Link href="#" fontSize="11" marginY="2">
        Forgotten your password?
      </Link>
    </>
  );
};

export default memo(SignIn);
