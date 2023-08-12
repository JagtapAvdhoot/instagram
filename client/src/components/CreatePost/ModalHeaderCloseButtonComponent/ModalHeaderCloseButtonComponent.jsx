import { memo, useContext } from "react";
import { IconButton, ModalCloseButton } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

import { CreatePostContext } from "../../../contexts/CreatePostContext";

const ModalHeaderCloseButtonComponent = memo(({ toggleModalState }) => {
	const {
		modalStage,
		setModalStage,
		selectedFiles,
		setSelectedFiles,
		setIsDiscardModalActive,
	} = useContext(CreatePostContext);
  
	const handleBack = () => {
		if (modalStage === "second") {
			setModalStage("first");
			return;
		} else if (modalStage === "third") {
			setModalStage("second");
			return;
		} else if (modalStage === "first") {
			if (selectedFiles.length > 0) {
				setIsDiscardModalActive(true);
			}
			return;
		}
	};
	return (
		<>
			{modalStage === "first" && selectedFiles.length === 0 ? (
				<ModalCloseButton left="5" top="2" />
			) : (
				<IconButton
					aria-label="button for icon from header in modal"
					position="absolute"
					_hover={{ bg: "none" }}
					fontSize="20"
					bg="none"
					color="secondary"
					left="2"
					top="1"
					icon={<BsArrowLeft />}
					onClick={handleBack}
				/>
			)}
		</>
	);
});

export default ModalHeaderCloseButtonComponent;