import React, { memo } from "react";
import { Box, Button, Center, HStack, Text, useMediaQuery } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import UserItemComponent from "./UserItemComponent/UserItemComponent";
import { getUserSuggestion } from "../../services/user.service";

const SuggestedUser = () => {
	const [isLargerThan1250] = useMediaQuery("(min-width: 1250px)");
	// const { isLoading, data = [], error } = useSuggestedUsersQuery(15);

	const { isLoading, data = { users: [] } } = useQuery({
		queryKey: ["SuggestedUser"],
		queryFn: () => getUserSuggestion()
	});
	return (
		<>
			<Box
				overflow="hidden"
				w="inherit"
				maxW="300px"
			>
				<HStack justifyContent='space-between' width='full'>
					<Text py="3" fontWeight="semibold" color="secondaryText">
            Suggested users
					</Text>
					<Button variant='unstyled' fontSize='sm' color='secondary'>See all</Button>
				</HStack>
				{data.users.length > 0 ? (
					data.users.map((user, idx) => <UserItemComponent user={user} key={idx} />)
				) : (
					<Center p='4'>No data found</Center>
				)}
			</Box>
		</>
	);
};

export default memo(SuggestedUser);
