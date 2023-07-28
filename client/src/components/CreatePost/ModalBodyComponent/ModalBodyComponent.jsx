import { memo, useContext } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";

import { CreatePostContext } from "../../../contexts/CreatePostContext";

import ImageSelectionComponent from "../ImageSelectionComponent/ImageSelectionComponent";
import FilterSelectorComponent from "../FilterSelectorComponent/FilterSelectorComponent";
import CreatePostInputsComponent from "../CreatePostInputsComponent/CreatePostInputsComponent";
import CreateModalImageRender from "../CreateModalImageRender/CreateModalImageRender";

const ModalBodyComponent = memo(() => {
  const { modalStage, selectedFiles } = useContext(CreatePostContext);
  return (
    <>
      <Flex height="385px">
        {modalStage === "first" && selectedFiles.length === 0 && (
          <Flex flex="1" justifyContent="center" alignItems="center">
            <ImageSelectionComponent />
          </Flex>
        )}
        {selectedFiles.length > 0 && (
          <Flex
            flex="1"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <CreateModalImageRender />
          </Flex>
        )}

        {modalStage === "second" && (
          <Box
            w="45%"
            h="410px"
            overflowY="scroll"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            <HStack alignItems="center">
              <FilterSelectorComponent />
            </HStack>
          </Box>
        )}
        {modalStage === "third" && (
          <Box
            w="45%"
            h="410px"
            overflowY="scroll"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            <CreatePostInputsComponent />
          </Box>
        )}
      </Flex>
    </>
  );
});

export default ModalBodyComponent;
