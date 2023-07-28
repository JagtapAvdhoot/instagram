import React, { lazy, Suspense, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { darkTheme, lightTheme } from "./theme/theme";
import { useAuthStore, useGlobalStore } from "./app/store";
import { useQuery } from "@tanstack/react-query";
import { signedUserKey } from "./react-query";
import { getSignedUser } from "./services/user.service";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import { useNavigate } from "react-router-dom";

const EntryComponent = lazy(() =>
  import("./components/EntryComponent/EntryComponent")
);

function App() {
  const theme = useGlobalStore(state => state.theme);
  const token = useAuthStore(state => state.token);
  const setSignedUser = useAuthStore(state => state.setSignedUser);
  const setToken = useAuthStore(state => state.setToken);

  const navigate = useNavigate();

  const { isLoading, isError,error, isSuccess } = useQuery({
    queryKey: [signedUserKey],
    queryFn: () => getSignedUser(),
    onSuccess: (data) => {
      setSignedUser(data.user)
    },
  })

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
        {!isLoading && isSuccess ? <Suspense fallback={<LoadingPage />}>
          <SmoothScroll>
            <EntryComponent />
          </SmoothScroll>
        </Suspense> : <LoadingPage />}
        {
          isError && <h2>some error occurred</h2>
        }
      </ChakraProvider>
    </>
  )
}

export default App
