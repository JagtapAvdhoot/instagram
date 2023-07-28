import { memo, useState } from "react";
import { useToast,Text } from "@chakra-ui/react";

import { errorToast } from "../../../util/toast";

import SidebarDrawer from '../Drawer/Drawer';

const NotificationDrawer = ({ isOpen, onClose, size = "sm" }) => {
    return (
      <>
        <SidebarDrawer isOpen={isOpen} onClose={onClose} name="Notifications">
          <Text>That data is never coming...</Text>
        </SidebarDrawer>
      </>
    );
  };
  
  export default memo(NotificationDrawer);