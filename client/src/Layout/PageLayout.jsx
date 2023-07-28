import React, { createContext, memo, useContext } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { PageLayoutContext } from "../contexts/PageLayoutContext";


const PageLayout = ({ children }) => {
  const { isLargerThan800, isLargerThan900 } = useContext(PageLayoutContext);
  // const isSidebarFull = sidebarSize ? false : isLargerThan1250 ? true : false;
  return (
    <>
      <Box w="fit-content" data-scroll-section>
        <Box
          as="main"
          display="block"
          marginLeft={isLargerThan800 ? isLargerThan900 ? "56" : "20" : "0"}
          color="secondary"
          bg="main"
          w={["-webkit-fill-available", "-moz-available"]}
          height="auto"
          minHeight="100vh"
          position="fixed"
          overflowY="auto"
          zIndex="-5"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default memo(PageLayout);
