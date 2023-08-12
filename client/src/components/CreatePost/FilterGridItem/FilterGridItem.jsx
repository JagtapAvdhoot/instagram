import { memo } from "react";
import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";

import filterDemoImage from "../../../assets/filter-demo.jpg";


const FilterGridItem = memo(({ filter, name, onClickFunction }) => {
	return (
		<GridItem position="relative" p="3" width="full" height="auto">
			<Box
				style={{
					filter,
				}}
				width="inherit"
				height="inherit"
				zIndex="1"
			>
				<Image src={filterDemoImage} height="inherit" />
			</Box>
			<Flex
				position="absolute"
				bg="none"
				opacity="0"
				w="full"
				h="full"
				padding="3"
				justifyContent="center"
				alignItems="center"
				_hover={{
					opacity: 1,
					bg: "rgba(0,0,0,0.3)",
				}}
				top="0"
				left="0"
				zIndex="5"
				cursor="pointer"
			>
				<Text as="p" color="main">
					{name}
				</Text>
			</Flex>
		</GridItem>
	);
});

export default FilterGridItem;
  