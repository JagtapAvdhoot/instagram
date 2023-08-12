import { memo } from "react";
import { BsBookmark, BsClockHistory, BsSun } from "react-icons/bs";
import { MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { RiSettings5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TbMessageReport } from "react-icons/tb";
import { setSignedUserSelector, setThemeSelector, setTokenSelector, useAuthStore, useGlobalStore } from "../../../app/store";

const SidebarMenuList = memo(() => {

	const setSignedUser = useAuthStore(setSignedUserSelector);
	const setTheme = useGlobalStore(setThemeSelector);
	const setToken = useAuthStore(setTokenSelector);

	const signout = () => {
		setToken(null);
		setSignedUser(null);
		navigate("/authentication");
	};

	const navigate = useNavigate();
	const menuOptionsWithIcon = [
		{
			Icon: RiSettings5Fill,
			name: "Setting",
			link: true,
			onClickFunc: () => null,
		},
		{
			Icon: BsClockHistory,
			name: "Your activity",
			link: true,
			onClickFunc: () => null,
		},
		{
			Icon: BsBookmark,
			name: "Saved",
			link: true,
			onClickFunc: () => null,
		},
		{
			Icon: BsSun,
			name: "Switch appearance",
			link: false,
			onClickFunc: () => setTheme(),
		},
		{
			Icon: TbMessageReport,
			name: "Report a problem", // open model
			link: false,
			onClickFunc: () => null,
		},
	];
	const menuOptionsWithoutIcon = [
		{
			Icon: false,
			name: "Switch accounts",
			link: true,
			onClickFunc: () => null,
		},
		{
			Icon: false,
			name: "Log out",
			link: false,
			onClickFunc: () => signout()
		},
	];
	return (
		<MenuList
			boxShadow="dark-lg"
			borderColor="hover"
			bg="main"
			color="secondary"
			fontSize="md"
			paddingX="1"
		>
			{menuOptionsWithIcon.map((menuItem, index) => (
				<MenuItem
					bg="main"
					_hover={{
						bg: "hover",
					}}
					icon={<menuItem.Icon />}
					key={index}
					onClick={menuItem.onClickFunc}
				>
					<Text>{menuItem.name}</Text>
				</MenuItem>
			))}
			<MenuDivider />
			{menuOptionsWithoutIcon.map((menuItem, index) => (
				<MenuItem
					bg="main"
					height="10"
					_hover={{
						bg: "hover",
					}}
					key={index}
					onClick={menuItem.onClickFunc}
				>
					<Text>{menuItem.name}</Text>
				</MenuItem>
			))}
		</MenuList>
	);
});

export default SidebarMenuList;
