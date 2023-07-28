import { memo, useContext } from "react";
import { Button, Spinner } from "@chakra-ui/react";

import { CreatePostContext } from "../../../contexts/CreatePostContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, removeFile, uploadFile } from "../../../services/post.service";
import { createPostKey, homeFeedKey, uploadFileKey } from "../../../react-query";

const ModalHeaderNextComponent = memo(({ toggleModalState }) => {
  const {
    modalStage,
    description,
    setModalStage,
    charLimit,
    media,
    location,
    hideStats,
    hideComments,
    imgAlt,
    selectedFiles,
    setMedia,
    clearModal
  } = useContext(CreatePostContext);

  const queryClient = useQueryClient();
  const { mutate: createPostFunction, isLoading: createPostLoading } = useMutation({
    mutationKey: [createPostKey],
    mutationFn: (body) => createPost(body),
    onSettled: (data) => {
      queryClient.invalidateQueries([homeFeedKey])
      toggleModalState();
      clearModal();
    }
  })
  const { mutate: uploadFileFunction, isLoading: uploadMediaLoading } = useMutation({
    mutationKey: [uploadFileKey],
    mutationFn: (body) => uploadFile(body),
    onSettled:(data) => {
      setMedia(data.results);
    }
  })

  const handleCreatePost = () => {
    createPostFunction({
      description,
      media,
      location,
      hideStats,
      hideComments,
      alt: imgAlt,
    });
  };
  const handleNext = () => {
    if (modalStage === "first") {
      setModalStage("second");
      if (selectedFiles.length === 0) return;
      uploadFileFunction({ media: selectedFiles })
    } else if (modalStage === "second") {
      setModalStage("third");
    }
  };

  return (
    <>
      <Button
        h="6"
        _hover={{ bg: "none" }}
        variant="ghost"
        color="follow"
        position="absolute"
        top="3"
        right="1"
        onClick={
          uploadMediaLoading || createPostLoading
            ? () => null
            : modalStage === "first" || modalStage === "second"
              ? handleNext
              : handleCreatePost
        }
        isDisabled={
          description.length > charLimit || selectedFiles.length === 0
            ? true
            : false
        }
      >
        {uploadMediaLoading || createPostLoading ? (
          <Spinner />
        ) : (
          "Next"
        )}
      </Button>
    </>
  );
});

export default ModalHeaderNextComponent;
