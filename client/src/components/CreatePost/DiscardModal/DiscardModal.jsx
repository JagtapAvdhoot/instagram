import { memo, useContext } from "react";
import { Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import {errorToast} from '../../../util/toast';
import { CreatePostContext } from "../../../contexts/CreatePostContext";
import { removeFile } from "../../../services/post.service";
import { removeFileKey } from "../../../react-query";

import MiniModal from "../../MiniModal/MiniModal";

const DiscardModal = memo(({ toggleModal }) => {
  const toast = useToast();

  // TODO: set keys in react-query file 
  const { mutate: removeFileFunction, isLoading: removeMediaLoading, isError } = useMutation({
    mutationKey: [removeFileKey],
    mutationFn: (media) => removeFile(media),
    onSuccess: () => {
      toggleModal();
      clearModal();
      setIsDiscardModalActive(false);
    },
    onError: () => {
      toast({
        title: "Error while discarding post",
        ...errorToast
      });
    }
  })

  const { isDiscardModalActive, setIsDiscardModalActive, media, clearModal } =
    useContext(CreatePostContext);

  const toggleDiscardModal = () => {
    setIsDiscardModalActive(!isDiscardModalActive);
  };

  const handleClearPost = () => {
    if (media.length > 0) {
      removeFileFunction({ media });
    } else {
      toggleModal();
      clearModal();
      setIsDiscardModalActive(false);
    }
  };

  return (
    <>
      <MiniModal
        modalOnClose={toggleDiscardModal}
        modalOpen={isDiscardModalActive}
        rounded="2xl"
        size="xs"
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="full"
          color="secondary"
        >
          <Text as="h4" my="3" fontSize="22">
            Discard post?
          </Text>
          <Text width="60" textAlign="center">
            If you leave, your edits won't be saved.
          </Text>
          <Button
            variant="ghost"
            bg="none"
            _hover={{ bg: "none" }}
            rounded="none"
            color="like"
            display="block"
            width="full"
            borderBottom="1px"
            height="55px"
            borderBottomColor="hover"
            onClick={handleClearPost}
          >
            {removeMediaLoading ? <Spinner size={20} /> : "Discard"}
          </Button>
          <Button
            variant="ghost"
            bg="none"
            color="secondary"
            rounded="none"
            _hover={{ bg: "none" }}
            display="block"
            width="full"
            height="55px"
            onClick={toggleDiscardModal}
          >
            Cancel
          </Button>
        </Flex>
      </MiniModal>
    </>
  );
});

export default DiscardModal;
