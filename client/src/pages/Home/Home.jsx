import { Avatar, Button, Container, Flex, HStack, Link, Spinner, Text, VStack } from "@chakra-ui/react";
import React, {
  Suspense,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { PageLayoutContext } from "../../contexts/PageLayoutContext";
import { getHomeFeed } from "../../services/post.service";
import { PostSkeleton } from "../../components/Skeletons/Skeletons";
import PostProvider from "../../contexts/PostContext";

import PageLayout from "../../Layout/PageLayout";
import Post from "../../components/Post/Post";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import SuggestedUser from "../../components/SuggestedUser/SuggestedUser";
import { homeFeedKey } from "../../react-query";
import { signedUserSelector, useAuthStore } from "../../app/store";

const Home = () => {
  const [offsetNumber, setOffsetNumber] = useState(0);

  const { isLargerThan1250, isLargerThan900 } = useContext(PageLayoutContext);

  const {
    isLoading,
    isFetching,
    data = { pages: [{ posts: [], total: 0 }], pageParams: [] },
    isError,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [homeFeedKey],
    queryFn: ({ pageParam = offsetNumber }) => getHomeFeed({ offset: pageParam, limit: 10, select: '-__v' }),
    getNextPageParam: () => {
      return offsetNumber + 1
    },
  })

  const _posts = data?.pages.flatMap(page => page.posts);

  const observingPostRef = useRef();
  const postRef = useCallback(
    (post) => {
      if (isLoading || isFetching) return;

      if (observingPostRef.current) observingPostRef.current.disconnect();

      observingPostRef.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && _posts.length < data.pages[0].total) {
          setOffsetNumber((prev) => prev + 1);
          fetchNextPage()
        }
      });

      if (post) observingPostRef.current.observe(post);
    },
    [isLoading, _posts.length]
  );

  return (
    <>
      <PageLayout>
        <ScrollWrapper customSlider={true}>
          <Container maxW="full" paddingY="2" px="0" m="0" bg="none">
            <Suspense
              fallback={
                <VStack w="inherit">
                  <Spinner size="lg" color="follow" />
                </VStack>
              }
            >
              <HStack alignItems="flex-start" gap="5" my="5">
                <VStack
                  width={isLargerThan900 ? "660px" : "full"}
                >
                  {_posts.length > 0 &&
                    _posts.map((post, idx) => {
                      if (_posts.length === idx + 3) {
                        return (
                          <Suspense key={post._id} fallback={<PostSkeleton />}>
                            <PostProvider post={post}>
                              <Post ref={postRef} />
                            </PostProvider>
                          </Suspense>
                        );
                      }
                      return (
                        <Suspense key={post._id} fallback={<PostSkeleton />}>
                          <PostProvider post={post}>
                            <Post />
                          </PostProvider>
                        </Suspense>
                      );
                    })}
                  {!isLoading && _posts.length === 0 && (
                    <Text as="h2">No posts</Text>
                  )}
                  {isLoading || isFetching ? (
                    <VStack w="inherit">
                      <Spinner size="lg" color="follow" />
                    </VStack>
                  ) : null}
                </VStack>
                {isLargerThan1250 && <VStack width="300px" gap='3' alignItems='flex-start'>
                  <UserWidget />
                  <SuggestedUser />
                  <HomeWidget />
                </VStack>}
              </HStack>
            </Suspense>
          </Container>
        </ScrollWrapper>
      </PageLayout>
    </>
  );
};

export default memo(Home);

const HomeWidget = () => {
  const options = ['About',
    'Help',
    'Press',
    'API',
    'Jobs',
    'Privacy',
    'Terms',
    'Locations',
    'Language',
    'English (UK)',
    'Meta Verified']

  return (
    <>
      <Flex
        gap="2"
        width="300px"
        wrap="wrap"
        wordBreak="keep-all"
        justifyContent="flex-start"
      >
        {options.map((item, index) => (
          <Link
            href={`/${item}`} //not working
            cursor="pointer"
            color='secondaryText'
            key={index}
            _hover={{
              textDecoration: "underline",
            }}
            fontSize="x-small"
          >
            {item}
          </Link>
        ))}
      </Flex>
      <Text fontSize="x-small" color='secondaryText' textAlign='start'>© 2023 INSTAGRAM FROM META</Text>
    </>
  )
}

const UserWidget = () => {
  const signedUser = useAuthStore(signedUserSelector)
  return (
    <HStack justifyContent='space-between' alignItems='center' width="inherit" height="50px">
      <Flex gap='3' alignItems='center' justifyContent='flex-start'>
        <Avatar src={signedUser.avatar} width='45px' height='45px' />
        <VStack gap='0' alignItems='flex-start'>
          <Text fontSize='md' fontWeight='bold' color='secondary'>{signedUser.username}</Text>
          <Text fontWeight='thin' color='secondary'>{signedUser.fullName}</Text>
        </VStack>
      </Flex>
      <Button variant='unstyled' fontSize='sm' color='follow'>Switch</Button>
    </HStack>
  )
}