import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { memo, useContext, useState } from "react";

import { PostContext } from "../../../contexts/PostContext";

import PostFooterIcons from "../PostFooterIcons/PostFooterIcons";
import PostFooterComment from "../PostFooterComment/PostFooterComment";

const PostFooter = memo(({ size }) => {
	const [isShowMore, setIsShowMore] = useState(false);

	const contextValues = useContext(PostContext);

	const handleShowDescription = () => {
		setIsShowMore(true);
	};

	return (
		<>
			{size === "md" ? (
				<>
					<PostFooterIcons />
					<Box w="480px">
						<Box as="span" maxW="inherit" wordBreak="break-all">
							<b>{contextValues.author.username}</b> -&nbsp;
							<span
								dangerouslySetInnerHTML={{
									__html:
                    contextValues.description.length > 45 && !isShowMore
                    	? contextValues.description.substring(0, 46) + "..."
                    	: contextValues.description,
								}}
							></span>
						</Box>
						{contextValues.description.length > 46 && !isShowMore && (
							<Text
								as="span"
								mt="-1"
								color="follow"
								cursor="pointer"
								onClick={handleShowDescription}
							>
                &nbsp;{isShowMore ? null : "more"}
							</Text>
						)}
					</Box>
					<PostFooterComment />
				</>
			) : (
				size === "sm" && null
			)}
		</>
	);
});

export default PostFooter;