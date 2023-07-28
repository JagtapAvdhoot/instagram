import { memo, useContext } from "react";
import { Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';

import { PostContext } from "../../../contexts/PostContext";

const PostFooterComment = memo(() => {

  const contextValues = useContext(PostContext);

  return (
    <>
      {contextValues.hideComments ? (
        <>
          <Center py="3" my="1" fontSize="xs">Comments are turned off.</Center>
        </>
      ) : (
        <InputGroup py="3" my="1">
          <Input variant="unstyled" placeholder="Add comment..." />
          {/* <EmojiPicker height="30em" width="40em" lazyLoadEmojis={true} /> */}
        </InputGroup>
      )}
    </>
  );
});

export default PostFooterComment;
