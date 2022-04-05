import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/righteous";
import "@fontsource/rubik";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config: config,
  fonts: {
    body: "Rubik",
    heading: "Rubik",
    logo: "Righteous",
  },
  colors: {
    primary: "#060698",
    secondary: "#d70475",
    success: "#0f8a30",
    card: "white",
    cardDark: "rgb(39, 39, 42)",
    mainBackground: "rgb(244, 244, 251)",
    mainBackgroundDark: "rgb(22, 27, 34)",
    secondaryText: "#515151",
    secondaryTextDark: "#c7c7c7",
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
      variants: {
        "link-button": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: "2px",
          borderColor: "secondary",
          color: "secondary",
          borderRadius: 4,
          fontWeight: "bold",
          fontSize: "lg",
          marginX: 2,
          paddingY: 1,
          paddingX: 4,
        },
      },
    },
    Button: {
      variants: {
        "submit-button": {
          borderRadius: 4,
          borderWidth: "2px",
          borderColor: "success",
          fontWeight: "bold",
          fontSize: "md",
          color: "success",
        },
      },
    },
  },
});

console.log(theme);

export default theme;
