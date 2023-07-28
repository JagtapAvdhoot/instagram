import moment from "moment";
import { Suspense, memo, useContext } from "react";

import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

import { PostContext } from "../../../contexts/PostContext";

import PostHeaderMenu from "../PostHeaderMenu/PostHeaderMenu";
import { PostHeaderSkeleton } from "../../Skeletons/Skeletons";
import { signedUserSelector, useAuthStore } from "../../../app/store";

const PostHeader = memo(({ size }) => {
  const contextValues = useContext(PostContext);

  const signedUser = useAuthStore(signedUserSelector);

  const isFavorite = signedUser?.favorites.find(
    (item) => item.user === contextValues?.author?._id
  );

  return (
    <Suspense fallback={<PostHeaderSkeleton />}>
      {size === "md" ? (
        <Flex height="50px" justifyContent="space-between" alignItems="center">
          <HStack>
            <Avatar
              name={contextValues.author?.username.toUpperCase()}
              src={contextValues.author.avatar}
              size="sm"
              mr="2"
            />
            <VStack alignItems="flex-start" gap="0">
              <HStack>
                <Text as="span" fontSize="sm" fontWeight="semibold">
                  {contextValues.author.username}
                </Text>
                <BsDot />
                <Text fontSize="small" color="secondaryText">
                  {moment(contextValues.createdAt).format("LL")}
                </Text>
              </HStack>
              {contextValues.location && (
                <Text fontSize="xs">{contextValues.location}</Text>
              )}
            </VStack>
          </HStack>

          <HStack>
            {isFavorite && <AiFillStar style={{ color: "#FF3141" }} />}
            <PostHeaderMenu />
          </HStack>
        </Flex>
      ) : (
        size === "sm" && null
      )}
    </Suspense>
  );
});

export default PostHeader;
