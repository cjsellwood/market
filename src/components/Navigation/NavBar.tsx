import { HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Link,
  IconButton,
  useDisclosure,
  Button,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import NavDrawer from "./NavDrawer";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      p="2"
      bg="primary"
      color="white"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "center" }}
      w="100%"
      position="fixed"
      zIndex="10"
      top="0"
      borderBottomWidth="1px"
      borderColor="#80808061"
      height="56px"
    >
      <Button
        display={{ base: "none", lg: "flex" }}
        onClick={() => {
          toggleColorMode();
        }}
        aria-label="toggle theme"
        bg="transparent"
        position="absolute"
        left="12px"
        top="8px"
        width="40px"
        _active={{ bg: "transparent" }}
        _hover={{
          backgroundColor: "#d6d6d652",
        }}
      >
        {colorMode === "light" ? (
          <Icon
            boxSize="6"
            viewBox="0 0 16 16"
            data-testid="moon"
            fill="secondary"
          >
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          </Icon>
        ) : (
          <SunIcon boxSize="6" data-testid="sun" color="secondary" />
        )}
      </Button>
      <Link as={RouterLink} to="/">
        <Flex alignItems="center">
          <Heading
            fontFamily="logo"
            fontWeight="300"
            fontSize="3xl"
            color="secondary"
            paddingX="2"
          >
            THE NEXUS
          </Heading>
        </Flex>
      </Link>
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        aria-label="open menu"
        backgroundColor="transparent"
        icon={<HamburgerIcon boxSize="7" />}
        color="#d70475"
      />
      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default NavBar;
