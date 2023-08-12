import { memo } from "react";
import { Box } from "@chakra-ui/react";

const PostFilter = memo(({ filter }) => {
	return (
		<>
			<Box position="absolute" width="full" height="full" style={{ filter }} />
		</>
	);
});

export default PostFilter;
