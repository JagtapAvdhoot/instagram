import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScroll = ({ children }) => {
	const scrollref = useRef(null);

	useEffect(() => {
		if (scrollref) return;

		const scroll = new LocomotiveScroll({
			el: scrollref.current,
			smooth: true,
		});

		scroll.init();

		return () => scroll.destroy();
	}, [scrollref]);

	return (
		<>
			<div
				data-scroll-container
				ref={scrollref}
			>
				{children}
			</div>

		</>
	);
};

export default SmoothScroll;