import { Box, Button, Link } from "@chakra-ui/react";
import { memo, useContext } from "react";
import { RxInstagramLogo } from "react-icons/rx";

import { PageLayoutContext } from "../../../contexts/PageLayoutContext";

import InstagramLogo from "../../InstagramLogo/InstagramLogo";
import { sidebarWidthSelector, themeSelector, useGlobalStore } from "../../../app/store";

const SidebarLogo = () => {
	const { isLargerThan900 } = useContext(PageLayoutContext);

	const sidebarWidth = useGlobalStore(sidebarWidthSelector);
	const theme = useGlobalStore(themeSelector);
	return (
		<Box paddingBottom="5">
			{!sidebarWidth && isLargerThan900 ? (
				<Link href="/" height="30">
					<InstagramLogo
						style={{
							height: "inherit",
							marginLeft: "30",
						}}
						color={theme === "light" ? "#000" : "#fff"}
					/>
				</Link>
			) : (
				<Link href="/">
					<Button
						color="secondary"
						variant="ghost"
						_hover={{
							bg: "none",
						}}
						fontSize="xl"
						leftIcon={<RxInstagramLogo />}
						iconSpacing="none"
					/>
				</Link>
			)}
		</Box>
	);
};

export default memo(SidebarLogo);
