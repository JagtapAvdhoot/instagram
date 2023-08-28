import React, { lazy, Suspense, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { ChakraProvider } from "@chakra-ui/react";
import { darkTheme, lightTheme } from "./theme/theme";
import {
  localStorageTokenConstant,
  setSignedUserSelector,
  themeSelector,
  tokenSelector,
  useAuthStore,
  useGlobalStore,
} from "./app/store";
import { useQuery } from "@tanstack/react-query";
import { signedUserKey } from "./react-query";
import { getSignedUser } from "./services/user.service";
import { isTokenExpired } from "./util/function";
import { useNavigate } from "react-router-dom";

const EntryComponent = lazy(() =>
  import("./components/EntryComponent/EntryComponent")
);

function App() {
  const theme = useGlobalStore(themeSelector);
  const token = useAuthStore(tokenSelector);
  const setSignedUser = useAuthStore(setSignedUserSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (theme) {
      localStorage.setItem("ig_theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (isTokenExpired(token)) {
      localStorage.removeItem(localStorageTokenConstant);
      navigate("/authentication", { replace: true });
    }
  }, [token, location.pathname]);

  useQuery({
    queryKey: [signedUserKey],
    queryFn: () => getSignedUser(),
    onSuccess: (data) => {
      setSignedUser(data.user);
    },
    onError: () => {
      localStorage.removeItem(localStorageTokenConstant);
      navigate("/authentication", { replace: true });
    },
    retry: false,
    enabled: !isTokenExpired(token),
  });

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
