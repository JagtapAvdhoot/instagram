import {
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	Slide,
	SlideFade,
	Text,
} from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomImageCarousel = ({
	images,
	selectorKey,
	objectFit="contain",
	height = "380px",
	width = "500px",
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const selectImage = images[currentIndex][selectorKey] ?? images[currentIndex];

	return (
		<Flex
			align="center"
			position="relative"
			width="full"
			height="full"
			justify="center"
		>
			{images.length > 1 ? (
				<Flex
					justifyContent="center"
					alignItems="center"
					minWidth="30px"
					position="absolute"
					left="4"
					height="30px"
					rounded="full"
					bg="secondaryText"
					color="main"
					onClick={goToPrevious}
				>
					<BsChevronLeft />
				</Flex>
			) : null}
			{/* <AnimatePresence> in future with framer motion or motion or gsap */}
			<img
				src={selectImage}
				style={{ objectFit, maxHeight:height, width }}
				loading="eager"
			/>
			{/* </AnimatePresence> */}
			{images.length > 1 ? (
				<Flex
					justifyContent="center"
					alignItems="center"
					minWidth="30px"
					height="30px"
					position="absolute"
					right="4"
					rounded="full"
					bg="secondaryText"
					color="main"
					onClick={goToNext}
				>
					<BsChevronRight />
				</Flex>
			) : null}
			{images.length > 1 ? (
				<Flex
					position="absolute"
					bottom={4}
					left="50%"
					transform="translateX(-50%)"
				>
					{images.map((_, index) => (
						<Text
							key={index}
							fontSize="3xl"
							mx={1}
							opacity={index === currentIndex ? 1 : 0.3}
							cursor="pointer"
							onClick={() => setCurrentIndex(index)}
							color={index === currentIndex ? "like" : "black"}
						>
              &bull;
						</Text>
					))}
				</Flex>
			) : null}
		</Flex>
	);
};

export default CustomImageCarousel;
