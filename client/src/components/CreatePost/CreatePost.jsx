import React, { useContext } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";

import { CreatePostContext } from "../../contexts/CreatePostContext";

import ModalHeaderComponent from "./ModalHeaderComponent/ModalHeaderComponent";
import ModalBodyComponent from "./ModalBodyComponent/ModalBodyComponent";
import DiscardModal from './DiscardModal/DiscardModal';

const CreatePost = ({ modalActive, toggleModalState }) => {
  const { modalStage } = useContext(CreatePostContext);

  return (
    <Modal
      isCentered
      isOpen={modalActive}
      onClose={toggleModalState}
      size={modalStage === "first" ? "md" : "3xl"}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="sm" bg="overlay" />
      <DiscardModal toggleModal={toggleModalState} />

      <ModalContent rounded="3xl" height="450px" overflow="hidden">
        <ModalHeaderComponent toggleModalState={toggleModalState} />
        <ModalBody bg="main" color="secondary">
          <ModalBodyComponent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePost;
