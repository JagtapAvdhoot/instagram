import { memo, useCallback, useContext } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineSmile, AiOutlineUser } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

import { CreatePostContext } from "../../../contexts/CreatePostContext";
import { useAuthStore, signedUserSelector } from '../../../app/store'

const CreatePostInputsComponent = memo(() => {
  const {
    selectedFiles,
    hideComments,
    hideStats,
    setHideComments,
    setHideStats,
    description,
    location,
    setLocation,
    setDescription,
    charLimit,
    imgAlt,
    setImgAlt,
  } = useContext(CreatePostContext);

  const signedUser = useAuthStore(signedUserSelector);

  const handleHideComments = useCallback(() => {
    setHideComments(!hideComments);
  }, [hideComments]);
  const handleDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);
  const handleImgAlt = useCallback((event) => {
    setImgAlt(event.target.value);
  }, []);
  const handleLocation = useCallback((event) => {
    setLocation(event.target.value);
  }, []);
  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats);
  }, [hideStats]);

  return (
    <>
      <Box pb="6">
        <Button
          variant="ghost"
          bg="none"
          _hover={{ bg: "none" }}
          iconSpacing="5"
          leftIcon={<AiOutlineUser />}
          px="2"
          color="secondary"
        >
          <b>{signedUser?.username}</b>
        </Button>
        <Box px="2" whiteSpace="pre-line">
          <Textarea
            variant="unstyled"
            height="70"
            resize="none"
            name="description"
            value={description}
            onChange={handleDescription}
            placeholder="Write Caption"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          />
          <HStack
            pb="3"
            borderBottom="1px"
            borderBottomColor="hover"
            justifyContent="space-between"
          >
            <AiOutlineSmile />

            <Flex alignItems="center">
              <CircularProgress
                size="16px"
                color="like"
                mr="2"
                value={(description?.length / charLimit) * 100}
              />
              <Text
                fontSize="14"
                color={
                  description?.length >= charLimit ? "tomato" : "secondary"
                }
              >
                {description?.length}/{charLimit}
              </Text>
            </Flex>
          </HStack>
          {/* emote and char length update */}
        </Box>
        <InputGroup px="2">
          <Input
            variant="unstyled"
            borderY="1px"
            borderColor="hover"
            bg="transparent"
            color="secondary"
            height="10"
            name="location"
            value={location}
            onChange={handleLocation}
            placeholder="Add Location"
          />
          <InputRightElement>
            <CiLocationOn />
          </InputRightElement>
        </InputGroup>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton px="2">
              <Box as="span" flex="1" textAlign="left">
                Accessibility
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel fontSize="10">
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
              <HStack mt="2">
                {/* img and input */}
                <Image
                  display="block"
                  src={selectedFiles[0]}
                  objectFit="cover"
                  maxWidth="50"
                  maxHeight="50"
                />
                <Input
                  height="50"
                  placeholder="Write alt text..."
                  value={imgAlt}
                  onChange={handleImgAlt}
                />
              </HStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton px="2">
              <Box as="span" flex="1" textAlign="left">
                Advanced Settings
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <HStack>
                <VStack>
                  <Box as="div" display="block" marginBottom="5" marginTop="1">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Heading as="h5" fontSize="14" mb="2">
                        Hide like and view counts on this post
                      </Heading>
                      <Checkbox
                        name="hideStats"
                        onChange={handleHideStats}
                        size="lg"
                        colorScheme="red"
                      />
                    </Flex>
                    <Text fontSize="10">
                      Only you will see the total number of likes and views on
                      this post. You can change this later by going to the ···
                      menu at the top of the post. To hide like counts on other
                      people's posts, go to your account settings.
                    </Text>
                  </Box>
                  <Box>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Heading as="h5" fontSize="14" mb="2">
                        Turn off commenting
                      </Heading>
                      <Checkbox
                        size="lg"
                        name="hideComments"
                        onChange={handleHideComments}
                        colorScheme="red"
                      />
                    </Flex>
                    <Text fontSize="10">
                      You can change this later by going to the ··· menu at the
                      top of your post
                    </Text>
                  </Box>
                </VStack>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
});

export default CreatePostInputsComponent;
