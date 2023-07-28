import { useMediaQuery } from "@chakra-ui/react";
import { createContext } from "react";

export const PageLayoutContext = createContext();

const PageLayoutProvider = ({ children }) => {
  const [isLargerThan1250] = useMediaQuery("(min-width: 1250px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");

  return (
    <PageLayoutContext.Provider
      value={{ isLargerThan1250, isLargerThan900,isLargerThan800, isLargerThan650 }}
    >
      {children}
    </PageLayoutContext.Provider>
  );
};

export default PageLayoutProvider;
