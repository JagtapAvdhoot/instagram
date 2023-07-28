import { extendTheme } from "@chakra-ui/react";

const commonColor = {
  like: "#FF3141",
  follow: "#0194F7",
};
const igLightTheme = {
  colors: {
    main: "#FFFFFF",
    secondary: "#000000",
    secondaryText: "rgba(0,0,0,0.7)",
    hover: "#eee",
    border: "#00000040",
    overlay: "rgba(50,50,50,0.5)",
    ...commonColor,
  },
};

const igDarkTheme = {
  colors: {
    main: "#000",
    secondary: "#F4F5F4",
    secondaryText: "rgba(255,255,255,0.7)",
    hover: "#222",
    border: "#262727",
    overlay: "rgba(255,255,255,0.05)",
    ...commonColor,
  },
};

export const darkTheme = extendTheme(igDarkTheme);
export const lightTheme = extendTheme(igLightTheme);
