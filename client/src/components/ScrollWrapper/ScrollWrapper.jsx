import { Box } from "@chakra-ui/react";
import React, { memo } from "react";

const ScrollWrapper = ({ children,customSlider=false }) => {
	const slider = customSlider ? {
		"&::-webkit-scrollbar": {
			width: "10px",
			backgroundColor: "transparent",
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "30px",
			backgroundColor: "hover",
		},
	} : {
		"&::-webkit-scrollbar": {
			display: "none",
		},
	};
	return (
		<>
			<Box
				w="-webkit-fill-available"
				display="block"
				overflowY="scroll"
				overflowX="hidden"
				height="100vh"
				__css={slider}
			>
				{children}
			</Box>
		</>
	);
};

export default memo(ScrollWrapper);
