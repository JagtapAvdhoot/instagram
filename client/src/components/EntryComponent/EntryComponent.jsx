import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import { Box, Spinner } from "@chakra-ui/react";

const User = lazy(() => import("../../pages/User/User"));
const Auth = lazy(() => import("../../pages/Auth/Auth"));
const Home = lazy(() => import("../../pages/Home/Home"));
const Sidebar = lazy(() => import("../../components/Sidebar/Sidebar"));
const Message = lazy(() => import("../../pages/Message/Message"));
const Explore = lazy(() => import("../../pages/Explore/Explore"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const PageLayoutProvider = lazy(() => import("../../contexts/PageLayoutContext"));

const EntryComponent = () => {
	const location = useLocation();

	return (
		<>
			<PageLayoutProvider>
				{location.pathname !== "/authentication" && <Sidebar />}
				<Routes>
					<Route path="/authentication" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<Auth />
						</Suspense>
					} />
					<Route path="/" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<Home />
						</Suspense>
					} />
					<Route path="/explore" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<Explore />
						</Suspense>
					} />
					<Route path="/username/:username" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<User />
						</Suspense>
					} />
					<Route path="/post/:postId" element={<>single post page</>} />
					<Route path="/message" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<Message />
						</Suspense>
					} />
					<Route path="*" element={
						<Suspense fallback={
							<Box bg="main" width="-webkit-fill-available" height="-webkit-fill-available">
								<Spinner color="secondary" size={30} />
							</Box>
						}>
							<NotFound />
						</Suspense>
					} />
				</Routes>
			</PageLayoutProvider>
		</>
	);
};

export default EntryComponent;
