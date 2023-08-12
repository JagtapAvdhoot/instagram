import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { memo } from "react";

const SidebarDrawer = ({ children, onClose, isOpen, size = "sm", name }) => {
	return (
		<>
			<Drawer onClose={onClose} placement="left" isOpen={isOpen} size={size}>
				<DrawerOverlay bg="overlay" />
				<DrawerContent bg="main" color="secondary" style={{ left: "80px" }}>
					<DrawerCloseButton top="6" />
					<DrawerHeader>
						<Text fontWeight="bold" fontSize="3xl">
							{name}
						</Text>
					</DrawerHeader>
					<DrawerBody>
						<VStack>{children}</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default memo(SidebarDrawer);
