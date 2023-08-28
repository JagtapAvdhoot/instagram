import { Button, Menu, MenuButton, Text } from "@chakra-ui/react";
import { memo, useContext } from "react";
import { RiMenuFill } from "react-icons/ri";

import { PageLayoutContext } from "../../../contexts/PageLayoutContext";
import { sidebarWidthSelector, useGlobalStore } from "../../../app/store";

import SidebarMenuList from "../SidebarMenuList/SidebarMenuList";

const SidebarMenu = memo(() => {
  const { isLargerThan900 } = useContext(PageLayoutContext);

  const sideBarWidth = useGlobalStore(sidebarWidthSelector);

  const isSidebarFull = sideBarWidth ? false : isLargerThan900 ? true : false;
  return (
    <>
      <Menu placement="right-end">
        <MenuButton
          color="secondary"
          as={Button}
          _hover={{ bg: "hover", transform: "scale(1.05)" }}
          _active={{ bg: "hover", transform: "scale(1.05)" }}
          leftIcon={<RiMenuFill />}
          fontSize="2xl"
          iconSpacing={isSidebarFull ? "2" : "0"}
          marginTop="auto"
          variant="ghost"
          justifyContent="flex-start"
          width="90%"
          marginX="3"
        >
          {isSidebarFull ? (
            <Text fontSize="lg" textAlign="start" fontWeight="light">
              Menu
            </Text>
          ) : null}
        </MenuButton>

        <SidebarMenuList />
      </Menu>
    </>
  );
});

export default SidebarMenu;
