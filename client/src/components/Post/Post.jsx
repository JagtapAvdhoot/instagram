import { Box } from "@chakra-ui/react";
import React, { Suspense, lazy, memo, useContext } from "react";
import {
  PostFooterSkeleton,
  PostHeaderSkeleton,
  PostMediaSkeleton,
} from "../Skeletons/Skeletons";
import { PostContext } from "../../contexts/PostContext";

const PostHeader = lazy(() => import("./PostHeader/PostHeader"));
const PostBody = lazy(() => import("./PostBody/PostBody"));
const PostFooter = lazy(() => import("./PostFooter/PostFooter"));

const Post = React.forwardRef(({ size = "md" }, ref) => {
  const { media } = useContext(PostContext);
  return (
    <Box
      as="aside"
      color="secondary"
      bg="main"
      display={media.length > 0 ? "block" : "none"}
      borderTop={size === 'sm' ? 'none' : "1px"}
      borderColor="border"
      maxH="auto"
      h={size === "sm" ? "inherit" : "auto"}
      w={size === "sm" ? "inherit" : "500px"}
      mb="0"
      px="2"
      ref={ref}
    >
      <Suspense fallback={<PostHeaderSkeleton />}>
        <PostHeader size={size} />
      </Suspense>
      <Suspense fallback={<PostMediaSkeleton />}>
        <PostBody size={size} />
      </Suspense>
      <Suspense fallback={<PostFooterSkeleton />}>
        <PostFooter size={size} />
      </Suspense>
    </Box>
  );
});

export default memo(Post);
