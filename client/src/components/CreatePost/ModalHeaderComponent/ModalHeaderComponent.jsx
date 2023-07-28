import { memo, useContext } from "react";
import { CreatePostContext } from "../../../contexts/CreatePostContext";
import { Center, ModalHeader } from "@chakra-ui/react";
import ModalHeaderCloseButtonComponent from "../ModalHeaderCloseButtonComponent/ModalHeaderCloseButtonComponent";
import ModalHeaderNextComponent from "../ModalHeaderNextComponent/ModalHeaderNextComponent";

const ModalHeaderComponent = memo(({ toggleModalState }) => {
    const { modalStage } = useContext(CreatePostContext);
    return (
      <>
        <ModalHeader
          borderBottom="1px"
          borderBottomColor="hover"
          bg="main"
          color="secondary"
          h="40"
          paddingY="2"
          paddingX="0"
        >
          <ModalHeaderCloseButtonComponent toggleModalState={toggleModalState} />
          <Center fontSize="18">
            {modalStage === "first"
              ? "Create Post"
              : modalStage === "second"
              ? "Apply Filters"
              : "Confirm Post"}
          </Center>
          <ModalHeaderNextComponent toggleModalState={toggleModalState} />
        </ModalHeader>
      </>
    );
  });

  export default ModalHeaderComponent;