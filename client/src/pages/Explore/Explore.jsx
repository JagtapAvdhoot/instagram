import { Box, GridItem, Spinner } from "@chakra-ui/react";
import React, {
	useCallback,
	useRef,
	useState,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { exploreFeedKey } from "../../react-query";
import { getExploreFeed } from "../../services/post.service";

import PageLayout from "../../Layout/PageLayout";
import GridPostRender from "../../components/GridPostRender/GridPostRender";
import Post from "../../components/Post/Post";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import PostProvider from "../../contexts/PostContext";

const Explore = () => {
	const [exploreOffset, setExploreOffset] = useState(0);

	const { isLoading, isFetching, isError, fetchNextPage, data = { pages: [{ posts: [], total: 0 }], pageParams: [] } } = useInfiniteQuery({
		queryKey: [exploreFeedKey],
		queryFn: ({ pageParam = exploreOffset }) => getExploreFeed({ offset: pageParam, limit: 20, select: "media _id" }),
		getNextPageParam: () => {
			return exploreOffset + 1;
		},
	});

	const _posts = data.pages.flatMap(pages => pages.posts);
	const observingPostRef = useRef();
	const postRef = useCallback(
		(post) => {
			if (isLoading || isFetching) return;

			if (observingPostRef.current) observingPostRef.current.disconnect();

			observingPostRef.current = new IntersectionObserver((posts) => {
				if (
					posts[0].isIntersecting &&
          _posts.length < data.pages[0].total
				) {
					setExploreOffset((prev) => prev + 1);
					fetchNextPage();
				}
			});

			if (post) observingPostRef.current.observe(post);
		},
		[isLoading, _posts.length]
	);

	return (
		<PageLayout>
			<ScrollWrapper>
				<Box py="12">
					{!isLoading && _posts.length > 0 ? (
						<GridPostRender>
							{_posts.map((post, idx) => {
								if (_posts.length - 1 === idx) {
									return (
										<GridItem
											gap="3"
											overflow="hidden"
											alignSelf="center"
											height="400px"
											key={post._id}
										>
											<PostProvider post={post}>
												<Post size="sm" ref={postRef} />
											</PostProvider>
										</GridItem>
									);
								}
								return (
									<GridItem
										gap="3"
										overflow="hidden"
										alignSelf="center"
										height='400px'
										key={post._id}
										mb="10"
									>
										<PostProvider post={post}>
											<Post size="sm" />
										</PostProvider>
									</GridItem>
								);
							})}
						</GridPostRender>
					) : (
						<Spinner size="lg" />
					)}
				</Box>
			</ScrollWrapper>
		</PageLayout>
	);
};

export default Explore;
