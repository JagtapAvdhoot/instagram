import { memo, useContext, useState } from "react";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {errorToast} from "../../../util/toast";
import { signedUserSelector, useAuthStore } from "../../../app/store";
import { removePost } from "../../../services/post.service";
import { favoriteUser, followUser } from "../../../services/user.service";
import { removePostKey, userFavoriteKey, userFollowKey } from "../../../react-query";

import { PostContext } from "../../../contexts/PostContext";

import MiniModal from "../../MiniModal/MiniModal";

const PostHeaderMenu = memo(() => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const contextValues = useContext(PostContext);
	const toast = useToast();
	const signedUser = useAuthStore(signedUserSelector);

	const { mutate: followUserFunction } = useMutation({
		mutationKey: [userFollowKey],
		mutationFn: (userId) => followUser(userId),
		onError: () => {
			toast({
				...errorToast,
				title:"Error while following user..."
			});
		}
	});
	const { mutate: favoriteUserFunction } = useMutation({
		mutationKey: [userFavoriteKey],
		mutationFn: (userId) => favoriteUser(userId),
		onError: () => {
			toast({
				...errorToast,
				title:"Error while adding user to favorites..."
			});
		}
	});
	const { mutate: removePostFunction } = useMutation({
		mutationKey: [removePostKey],
		mutationFn: (postId) => removePost(postId),
		onError: () => {
			toast({
				...errorToast,
				title:"Error while removing post..."
			});
		}
	});

	const navigate = useNavigate();

	const otherUserPostOptions = [
		{
			link: false,
			name: "Report",
			color: "red.500",
			onClickFunc: () => null,
		},
		{
			link: false,
			name: signedUser?.followingUsers.find(
				(item) => item.user === signedUser?._id
			)
				? "Unfollow"
				: "Follow",
			color: "red.500",
			onClickFunc: () => followUserFunction(signedUser?._id),
		},
		{
			link: false,
			name:
        signedUser?.favorites.findIndex(
        	(item) => item.user === contextValues.author._id
        ) === -1
        	? "Add to Favorites"
        	: "Remove from favorites",
			onClickFunc: () => favoriteUserFunction(contextValues.author._id),
		},
	];
	const postMenuItemTwo = [
		{
			link: false,
			name: "Share to...",
			onClickFunc: () => null, //shit
		},
		{
			link: false,
			name: "Copy link",
			onClickFunc: () => null, //shit
		},
		{
			link: false,
			name: "Embed",
			onClickFunc: () => null, //shit
		},
	];
	const ownPostOptions = [
		{
			link: false,
			name: "Delete",
			color: "red.500",
			onClickFunc: () => removePostFunction(contextValues._id),
		},
		{
			link: false,
			name: "Edit post",
			color: "red.500",
			onClickFunc: () => null, // post update
		},
		{
			link: false,
			name: "Hide comments",
			onClickFunc: () => null, // post
		},
		{
			link: false,
			name: "Hide likes and stats",
			onClickFunc: () => null, // post
		},
	];
	const postMenuCommons = [
		{
			link: true,
			name: "Go to post",
			onClickFunc: () =>
				navigate(`/${contextValues.author.username}/${contextValues._id}`),
		},
		{
			link: true,
			name: "About this account",
			onClickFunc: () => navigate(`/username/${contextValues.author.username}`),
		},
		{
			link: false,
			name: "Cancel",
			onClickFunc: () => toggleMenuState(),
		},
	];
	let postMenuItems;

	if (contextValues.author?._id === signedUser?._id) {
		postMenuItems = [...ownPostOptions, ...postMenuCommons];
	} else {
		postMenuItems = [
			...otherUserPostOptions,
			...postMenuItemTwo,
			...postMenuCommons,
		];
	}

	const toggleMenuState = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<>
			<IconButton
				aria-label="some shitty button in post component"
				sx={{ bg: "none" }}
				_hover={{ bg: "none", color: "secondaryText" }}
				fontSize="2xl"
				color="secondary"
				variant="unstyled"
				minW="max-content"
				icon={<BiDotsHorizontalRounded />}
				onClick={toggleMenuState}
			/>

			<MiniModal
				modalOnClose={toggleMenuState}
				modalOpen={isMenuOpen}
				rounded="3xl"
				size="sm"
			>
				{postMenuItems.map((item, idx) => (
					<Button
						variant="unstyled"
						width="full"
						color={item.color ? item.color : "secondary"}
						height="50px"
						key={idx}
						borderRadius="0"
						borderBottom="1px"
						borderBottomColor="border"
						onClick={() => {
							item.onClickFunc();
							toggleMenuState();
						}}
						_last={{ border: "none" }}
					>
						{item.name}
					</Button>
				))}
			</MiniModal>
		</>
	);
});

export default PostHeaderMenu;