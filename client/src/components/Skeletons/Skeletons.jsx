import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export const PostSkeleton = () => {
  return (
    <Box px="5" border="1px" borderColor="hover" width="500px" height="500px">
      <HStack py="3" justifyContent="space-between">
        <HStack>
          <SkeletonCircle size="10" />
          <Skeleton height="5" width="100px" />
        </HStack>
        <Skeleton height="6" width="6" />
      </HStack>
      <Skeleton height="500px" />
      <SkeletonText my="3" />
      <Skeleton height="30px" width="full" />
    </Box>
  );
};
export const PostHeaderSkeleton = () => {
  return (
    <HStack py="3" justifyContent="space-between">
      <HStack>
        <SkeletonCircle size="10" />
        <Skeleton height="5" width="100px" />
      </HStack>
      <Skeleton height="6" width="6" />
    </HStack>
  );
};
export const PostMediaSkeleton = () => {
  return <Skeleton height="400px" />;
};
export const PostFooterSkeleton = () => {
  return (
    <>
      <SkeletonText my="3" />
      <Skeleton height="30px" width="full" />
    </>
  );
};
