import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { memo, useContext, useState } from "react";

import { PageLayoutContext } from "../../contexts/PageLayoutContext";
import { sidebarWidthSelector, useGlobalStore } from "../../app/store";

import CreatePostProvider from "../../contexts/CreatePostContext";
import CreatePost from "../CreatePost/CreatePost";
import SidebarLogo from './SidebarLogo/SidebarLogo';
import SidebarLinks from './SidebarLinks/SidebarLinks';
import SidebarMenu from './SidebarMenu/SidebarMenu';

const Sidebar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);

  const { isLargerThan900, isLargerThan800 } = useContext(PageLayoutContext);

  const sidebarWidth = useGlobalStore(sidebarWidthSelector);

  const toggleCreateModal = () => {
    setIsCreateModalActive(!isCreateModalActive);
  };

  return (
    <>
      {isLargerThan800 && <Box
        width={
          isSearchOpen || isNotificationOpen
            ? "80"
            : sidebarWidth
              ? "20"
              : isLargerThan900
                ? "56"
                : "20"
        }
        position="relative"
        display="block"
        zIndex="modal"
      >
        <Box width={sidebarWidth ? "20" : isLargerThan900 ? "56" : "20"}>
          <Flex
            w="inherit"
            alignItems={
              sidebarWidth ? "center" : isLargerThan900 ? "start" : "center"
            }
            direction="column"
            bg="main"
            borderRight="1px"
            borderRightColor="border"
            position="fixed"
            height="100vh"
            paddingX="2"
            paddingY="6"
          >
            <SidebarLogo />

            <VStack
              gap="0"
              alignItems={isLargerThan900 ? "start" : "center"}
              width="100%"
            >
              <SidebarLinks
                isSearchOpen={isSearchOpen}
                isNotificationOpen={isNotificationOpen}
                isCreateModalActive={isCreateModalActive}
                setIsCreateModalActive={setIsCreateModalActive}
                setIsNotificationOpen={setIsNotificationOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </VStack>

            <SidebarMenu />

            <CreatePostProvider>
              <CreatePost
                modalActive={isCreateModalActive}
                toggleModalState={toggleCreateModal}
              />
            </CreatePostProvider>
          </Flex>
        </Box>
      </Box>}
    </>
  );
};

export default memo(Sidebar);
