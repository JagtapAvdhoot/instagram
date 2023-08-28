import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	GridItem,
	HStack,
	IconButton,
	Image,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BsGrid3X3 } from "react-icons/bs";
import { RiSettings3Fill } from "react-icons/ri";
import { LiaBookmarkSolid, LiaUserTagSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../../services/user.service";
import { userPageKey } from "../../react-query";
import { signedUserSelector, useAuthStore } from "../../app/store";
import PostProvider from "../../contexts/PostContext";
import Post from "../../components/Post/Post";

const MiniModal = lazy(() => import("../../components/MiniModal/MiniModal"));
const PageLayout = lazy(() => import("../../Layout/PageLayout"))
const GridPostRender = lazy(() => import("../../components/GridPostRender/GridPostRender"))
const ScrollWrapper = lazy(() => import("../../components/ScrollWrapper/ScrollWrapper"))

const User = () => {
	const { username } = useParams();

	const signedUser = useAuthStore(signedUserSelector);

	const { isLoading: userLoading, data: userData, error, isError } = useQuery({
		queryKey: [userPageKey, username],
		queryFn: () => getUserProfile(username),
		enabled: Boolean(username)
	});

	// change this loading return
	if (userLoading) return <h3>Fucking loading....</h3>;

	const tabDataArray = [
		{ name: "POSTS", Icon: BsGrid3X3 },
		{ name: "SAVED", Icon: LiaBookmarkSolid },
		{ name: "TAGGED", Icon: LiaUserTagSolid },
	];

	return (
		<PageLayout>
			<Container minWidth="full" minHeight="full">
				<ScrollWrapper>
					<Container maxWidth="4xl">
						<HStack justifyContent="flex-start" minHeight="full">
							<VStack my="14" mx="10">
								<Image
									src={userData.user.avatar}
									width="150px"
									height="150px"
									objectFit="cover"
									rounded="full"
								/>
							</VStack>
							<VStack
								alignItems="flex-start"
								minH="full"
								justifyContent="flex-start"
							>
								<HStack alignItems="center" gap="10">
									<Text fontSize="2xl" fontWeight="medium">
										{userData.user.username}
									</Text>
									{userData.user._id === signedUser._id && <div>
										<Button fontSize="sm" px="3" height="7">
											Edit Profile
										</Button>
										<SettingIcon />
									</div>}
								</HStack>
								<HStack gap="6">
									<Text fontSize="md">{userData.posts.length} posts</Text>

									<Text fontSize="md">
										{userData.user.followerUsers.length} followers
									</Text>

									<Text fontSize="md">
										{userData.user.followingUsers.length} followings
									</Text>
								</HStack>
								<h2>{userData.user.fullName}</h2>
							</VStack>
						</HStack>
						<Divider color="secondaryText" />
						<VStack>
							<Tabs variant="unstyled" width="full">
								<TabList justifyContent="center">
									{tabDataArray.map(({ name, Icon }, idx) => (
										<Tab
											fontSize="xs"
											color="secondaryText"
											gap="2"
											key={idx}
											_notLast={{ marginRight: "10" }}
											_selected={{ fontWeight: "bold", color: "secondary" }}
										>
											<Icon />
											{name}
										</Tab>
									))}
								</TabList>
								<TabPanels display="block">
									<TabPanel position="relative">
										<GridPostRender>
											{
												userData.posts.map((post, idx) => (
													<GridItem height="300px" width="300px" key={idx}>
														<PostProvider post={post}>
															<Post size='sm' />
														</PostProvider>
													</GridItem>
												))
											}
										</GridPostRender>
									</TabPanel>
									<TabPanel>
										<Center>posts saved appear here in future</Center>
									</TabPanel>
									<TabPanel>
										<Center>posts you are tagged will appear here in future</Center>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</VStack>
					</Container>
				</ScrollWrapper>
			</Container>
		</PageLayout>
	);
};

export default User;

const SettingIcon = () => {
	const [settingMenuOpen, setSettingMenuOpen] = useState();

	const toggleSettingMenu = () => {
		setSettingMenuOpen(!settingMenuOpen);
	};

	const settingMenuDataArray = [
		{ name: "Apps and websites", onClickFunction: () => null },
		{ name: "OR code", onClickFunction: () => null },
		{ name: "Notifications", onClickFunction: () => null },
		{ name: "Settings and privacy", onClickFunction: () => null },
		{ name: "Supervision", onClickFunction: () => null },
		{ name: "Log out", onClickFunction: () => null },
		{ name: "Cancel", onClickFunction: toggleSettingMenu },
	];

	return (
		<>
			<IconButton
				bg="none"
				fontSize="xl"
				color="secondary"
				_hover={{ bg: "none" }}
				onClick={toggleSettingMenu}
			>
				<RiSettings3Fill />
			</IconButton>

			<MiniModal modalOpen={settingMenuOpen} modalOnClose={toggleSettingMenu}>
				{settingMenuDataArray.map(({ name, onClickFunction }, idx) => (
					<Button
						variant="unstyled"
						width="full"
						color="secondary"
						_hover={{ bg: "hover" }}
						height="50px"
						key={idx}
						fontWeight="normal"
						borderRadius="0"
						borderBottom="1px"
						borderBottomColor="border"
						onClick={() => {
							onClickFunction();
							toggleSettingMenu();
						}}
						_last={{ border: "none" }}
					>
						{name}
					</Button>
				))}
			</MiniModal>
		</>
	);
};
