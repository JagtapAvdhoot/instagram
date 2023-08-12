import React, { lazy, Suspense, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { darkTheme, lightTheme } from "./theme/theme";
import { localStorageTokenConstant, setSignedUserSelector, signedUserSelector, themeSelector, tokenSelector, useAuthStore, useGlobalStore } from "./app/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { signedUserKey } from "./react-query";
import { getSignedUser } from "./services/user.service";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import { useNavigate } from "react-router-dom";

const EntryComponent = lazy(() =>
	import("./components/EntryComponent/EntryComponent")
);

function App() {
	const theme = useGlobalStore(themeSelector);
	const token = useAuthStore(tokenSelector);
	const setSignedUser = useAuthStore(setSignedUserSelector);

	const navigate = useNavigate();

	const { isFetching: signedUserLoading } = useQuery({
		queryKey: [signedUserKey],
		queryFn: () => getSignedUser(),
		onSuccess: (data) => {
			setSignedUser(data.user);
		},
		onError: (error) => {
			console.log("second this ran",error);
			localStorage.removeItem(localStorageTokenConstant);
			navigate("/authentication", { replace: true });
		},

	});

	useEffect(() => {
		if (theme) {
			localStorage.setItem("ig_theme", theme);
		}
	}, [theme]);

	useEffect(() => {
		if (token === null) {
			navigate("/authentication", { replace: true });
		}
	}, [token, location.pathname]);

	return (
		<>
			<ChakraProvider theme={theme === "light" ? lightTheme : darkTheme}>
				<Suspense fallback={<LoadingPage />}>
					<EntryComponent />
				</Suspense>
			</ChakraProvider>
		</>
	);
}

export default App;
