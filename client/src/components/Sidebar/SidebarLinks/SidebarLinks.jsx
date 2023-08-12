import { Avatar, Button, Text, Tooltip } from "@chakra-ui/react";
import { memo, useContext } from "react";
import {
	AiFillCompass,
	AiFillHeart,
	AiOutlineCompass,
	AiOutlineHeart,
	AiOutlineUser,
} from "react-icons/ai";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import {
	RiHomeFill,
	RiHomeLine,
	RiMessengerFill,
	RiMessengerLine,
	RiSearchFill,
	RiSearchLine,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import { PageLayoutContext } from "../../../contexts/PageLayoutContext";
import { setSidebarWidthSelector, sidebarWidthSelector, signedUserSelector, useAuthStore, useGlobalStore } from "../../../app/store";


import NotificationDrawer from "../NotificationDrawer/NotificationDrawer";
import SearchDrawer from "../SearchDrawer/SearchDrawer";

const SidebarLinks = memo(
	({
		isSearchOpen,
		isNotificationOpen,
		isCreateModalActive,
		setIsCreateModalActive,
		setIsNotificationOpen,
		setIsSearchOpen,
	}) => {
		const { isLargerThan900 } = useContext(PageLayoutContext);

		const signedUser = useAuthStore(signedUserSelector);
		const sidebarWidth = useGlobalStore(sidebarWidthSelector);
		const setSidebarWidth = useGlobalStore(setSidebarWidthSelector);

		const location = useLocation();
		const navigate = useNavigate();
		const toggleCreateModal = () => {
			setIsCreateModalActive(!isCreateModalActive);
		};
		const sidebarLinks = [
			{
				name: "Home",
				Icon: RiHomeLine,
				link: true,
				FillIcon: RiHomeFill,
				slug: "/",
				onClickFunc: () => navigate("/"),
			},
			{
				name: "Search",
				Icon: isSearchOpen ? RiSearchFill : RiSearchLine,
				link: false,
				slug: isSearchOpen,
				toggleFunc: () => toggleSearchState(),
			},
			{
				name: "Explore",
				Icon: AiOutlineCompass,
				link: true,
				FillIcon: AiFillCompass,
				slug: "/explore",
				onClickFunc: () => navigate("/explore"),
			},
			{
				name: "Reels",
				Icon: RiHomeLine,
				link: true,
				FillIcon: RiHomeFill,
				slug: "/reel",
				onClickFunc: () => navigate("/reel"),
			},
			{
				name: "Messages",
				Icon: RiMessengerLine,
				link: true,
				FillIcon: RiMessengerFill,
				slug: "/message",
				onClickFunc: () => navigate("/message"),
			},
			{
				name: "Notifications",
				Icon: isNotificationOpen ? AiFillHeart : AiOutlineHeart,
				link: false,
				slug: isNotificationOpen,
				toggleFunc: () => toggleNotificationState(),
			},
			{
				name: "Create",
				Icon: isCreateModalActive ? BsPlusSquareFill : BsPlusSquare,
				link: false,
				slug: isCreateModalActive,
				toggleFunc: () => toggleCreateModal(),
			},
			{
				name: "Profile", // also add username here
				Icon: AiOutlineUser, // make it avatar
				link: true,
				FillIcon: null,
				slug: `/${signedUser?.username ? signedUser.username : "username"}`,
				onClickFunc: () =>
					navigate(
						`/username/${signedUser?.username ? signedUser.username : "username"
						}`,
						{
							replace: true,
						}
					),
			},
		];
		const toggleSearchState = () => {
			setIsSearchOpen(!isSearchOpen);
			if (isLargerThan900) {
				setSidebarWidth();
			}
		};
		const toggleNotificationState = () => {
			setIsNotificationOpen(!isNotificationOpen);
			if (isLargerThan900) {
				setSidebarWidth();
			}
		};
		return (
			<>
				{sidebarLinks.map((item, index) => (
					<Button
						variant="ghost"
						key={index}
						color="secondary"
						_hover={{
							bg: "hover",
							transform: "scale(1.05)",
						}}
						width="-webkit-fill-available"
						leftIcon={
							item.name === "Profile" && signedUser?.avatar ? (
								<Avatar
									src={signedUser.avatar}
									size="xs"
									aspectRatio="1/1"
									name="signedUser.username"
								/>
							) : item.FillIcon && location.pathname === item.slug ? (
								<item.FillIcon />
							) : (
								<item.Icon />
							)
						}
						onClick={item.toggleFunc ? item.toggleFunc : item.onClickFunc}
						fontSize="2xl"
						iconSpacing={!sidebarWidth && isLargerThan900 ? "3" : "0"}
						marginY="2"
						marginX="3"
						justifyContent={isLargerThan900 ? "flex-start" : "center"}
					>
						{!sidebarWidth && isLargerThan900 ? (
							<Text
								fontSize="medium"
								fontWeight={
									location.pathname === item.slug ? "bold" : "normal"
								}
							>
								{item.name}
							</Text>
						) : null}
					</Button>
				))}

				{isSearchOpen && (
					<SearchDrawer isOpen={isSearchOpen} onClose={toggleSearchState} />
				)}
				{isNotificationOpen && (
					<NotificationDrawer
						isOpen={isNotificationOpen}
						onClose={toggleNotificationState}
					/>
				)}
			</>
		);
	}
);

export default SidebarLinks;
