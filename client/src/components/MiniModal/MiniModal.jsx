import React, { memo } from "react";
import {
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
} from "@chakra-ui/react";

const MiniModal = ({
	modalOpen,
	modalOnClose,
	size = "sm",
	rounded = "3xl",
	children,
	header = false
}) => {
	return (
		<>
			<Modal isCentered isOpen={modalOpen} onClose={modalOnClose} size={size}>
				<ModalOverlay bg="overlay" backdropFilter="auto" backdropBlur="sm" />
				<ModalHeader>
					{header && <HStack gap='0' alignItems='center'>
						{header}
					</HStack>}
				</ModalHeader>
				<ModalContent overflow="hidden" rounded={rounded} bg="main">
					<ModalBody p="0">
						<VStack gap="0">{children}</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default memo(MiniModal);
