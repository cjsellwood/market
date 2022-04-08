import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/righteous";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";

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
    secondary: "#e5067d",
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
          fontWeight: "500",
          fontSize: "lg",
          marginX: 2,
          paddingY: 1,
          paddingX: 4,
        },
        "neutral-link": {
          borderWidth: "1px",
          fontWeight: "normal",
          marginX: "2",
          borderRadius: "6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    Button: {
      variants: {
        "link-button": {
          borderWidth: "2px",
          borderColor: "secondary",
          color: "secondary",
          borderRadius: 4,
          fontWeight: "500",
          fontSize: "lg",
          marginX: 2,
          paddingY: 1,
          paddingX: 4,
        },
        "submit-button": {
          borderRadius: 4,
          borderWidth: "2px",
          borderColor: "success",
          fontWeight: "500",
          fontSize: "md",
          color: "success",
        },
        "image-button": {
          borderRadius: "100",
          color: "white",
          bg: "primary",
        },
        "neutral-button": {
          borderWidth: "1px",
          fontWeight: "normal",
          marginX: "2",
        },
      },
    },
  },
});

export default theme;
