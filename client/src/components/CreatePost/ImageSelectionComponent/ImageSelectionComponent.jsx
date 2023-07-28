import { memo, useCallback, useContext } from "react";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";

import { CreatePostContext } from "../../../contexts/CreatePostContext";

const ImageSelectionComponent = memo(() => {
  const { setSelectedFiles } = useContext(CreatePostContext);

  const handleFileSubmit = useCallback((event) => {
    const media = [...event.target.files];
    if (media.length > 10) return;

    const readPromise = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };

    Promise.all(media.map((item) => readPromise(item))).then((data) => {
      setSelectedFiles(data);
    });
  }, []);

  return (
    <>
      <Box position="relative" display="block" as="div" height="full">
        <Input
          type="file"
          multiple={true}
          opacity="0"
          w="full"
          h="full"
          position="absolute"
          cursor="pointer"
          accept="video/mp4,image/jpg,image/jpeg"
          onInput={handleFileSubmit}
        />
        {/* <Image src={} /> */}
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          fontSize="8xl"
          h="full"
        >
          <AiOutlineUpload />
          <Heading as="h3" size="lg">
            Select file to upload
          </Heading>
        </Flex>
      </Box>
    </>
  );
});

export default ImageSelectionComponent;
