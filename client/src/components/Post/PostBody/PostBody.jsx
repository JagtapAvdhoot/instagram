import { memo, useContext } from "react";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

import { PostContext } from "../../../contexts/PostContext";

import CustomImageCarousel from "../../ImageCarousel/ImageCarousel";

const PostBody = memo(({ size }) => {
	const { media, _id, setIsPostOpen } = useContext(PostContext);

	const handlePostClick = () => {
		setIsPostOpen(true);
	};

	return (
		<>
			<Box
				height="inherit"
				mb={size === "md" ? "4" : "unset"}
				bg="transparent"
				border={size === "sm" ? "none" : "1px"}
				borderColor='border'
				position="relative"
				overflow="hidden"
				rounded={size === "sm" ? "sm" : "md"}
			>
				{media.length > 0 && (
					<>
						<CustomImageCarousel
							objectFit={size === "sm" ? "cover" : "contain"}
							images={media}
							selectorKey="secureUrl"
							height="580px"
						/>
					</>
				)}

				{size === "sm" && (
					<Flex
						h="full"
						w="full"
						position="absolute"
						zIndex="9000"
						top="0"
						justifyContent="center"
						alignItems="center"
						opacity="0"
						transition="all"
						transitionDuration="0.2s"
						_hover={{ bg: "overlay", opacity: 1 }}
						onClick={handlePostClick}
					>
						<IconButton
							fontSize="4xl"
							color="white"
							bg="none"
							_hover={{ bg: "none", color: "like", filter: "invert(0)" }}
						>
							<AiFillHeart />
						</IconButton>
					</Flex>
				)}
			</Box>
		</>
	);
});

export default PostBody;
