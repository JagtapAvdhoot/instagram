import { Center, Flex, HStack, IconButton, Text, VStack, useToast } from "@chakra-ui/react";
import { memo, useContext } from "react";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostContext } from "../../../contexts/PostContext";
import { signedUserSelector, useAuthStore } from "../../../app/store";
import { errorToast } from "../../../util/toast";
import { likePost, savePost } from "../../../services/post.service";
import { likePostKey, savePostKey, signedUserKey } from "../../../react-query";

const PostFooterIcons = memo(() => {
	const contextValues = useContext(PostContext);

	const toast = useToast();
	const signedUser = useAuthStore(signedUserSelector);

	const hasLiked = contextValues?.postLikes.findIndex(
		(pst) => pst.user === signedUser?._id
	);
	const hasBookmark = contextValues?.postSaves.findIndex(
		(pst) => pst.user === signedUser?._id
	);

	const queryClient = useQueryClient();
	const { mutate: likePostFunction } = useMutation({
		mutationKey: [likePostKey],
		mutationFn: (postId) => likePost(postId),
		onError: () => {
			toast.closeAll();
			toast({
				title: "Error while liking post...",
				...errorToast,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries([signedUserKey]);
		},
		onMutate: () => {
			if (hasLiked === -1) {
				contextValues.postLikes.push({ user: signedUser?._id });
			} else {
				contextValues.postLikes.splice(hasLiked, 1);
			}
		}
	});
	const { mutate: savePostFunction } = useMutation({
		mutationKey: [savePostKey],
		mutationFn: (postId) => savePost(postId),
		onError: () => {
			toast.closeAll();
			toast({
				title: "Error while saving post..",
				...errorToast,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries([signedUserKey]);
		},
		onMutate: () => {
			if (hasBookmark === -1) {
				contextValues.postSaves.push({ user: signedUser?._id });
			} else {
				contextValues.postSaves.splice(hasBookmark, 1);
			}
		}
	});


	const handleLike = async () => {
		likePostFunction(contextValues._id);
	};
	const handleShare = () => { };
	const handleComment = () => { };

	const handleBookmark = async () => {
		savePostFunction(contextValues._id);
	};

	return (
		<VStack gap="0" alignItems="self-start" mt="2" py="1">
			<Flex
				alignItems="center"
				justifyContent="space-between"
				height="20px"
				width="full"
			>
				<HStack alignItems="center">
					<IconButton
						bg="none"
						fontSize="2xl"
						rounded="full"
						_hover={{ bg: "none" }}
						color="secondary"
						variant="unstyled"
						minW="max-content"
						icon={
							hasLiked !== -1 ? (
								<AiFillHeart style={{ fill: "#FF3141" }} />
							) : (
								<AiOutlineHeart />
							)
						}
						onClick={handleLike}
					/>
					<IconButton
						bg="none"
						fontSize="2xl"
						rounded="full"
						_hover={{ bg: "none" }}
						color="secondary"
						variant="unstyled"
						minW="max-content"
						ml="3"
						icon={<BiComment />}
					/>
					<IconButton
						bg="none"
						fontSize="2xl"
						rounded="full"
						_hover={{ bg: "none" }}
						color="secondary"
						variant="unstyled"
						minW="max-content"
						ml="3"
						icon={<RiShareForwardLine />}
					/>
				</HStack>
				<IconButton
					bg="none"
					_hover={{ bg: "none" }}
					fontSize="20px"
					rounded="full"
					color="secondary"
					variant="unstyled"
					minW="max-content"
					onClick={handleBookmark}
					icon={hasBookmark === -1 ? <BsBookmark /> : <BsBookmarkFill />}
				/>
			</Flex>
			{!contextValues.hideStats ? contextValues.postLikes.length > 0 && (
				<Text py="1">
					{contextValues.postLikes.length}&nbsp;
					{contextValues.postLikes.length > 1 ? "likes" : "like"}
				</Text>
			) : (
				<Center py="1" fontSize="xs" >Stats are hidden.</Center>
			)}
		</VStack>
	);
});

export default PostFooterIcons;