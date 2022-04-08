import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import NavDrawer from "./NavDrawer";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      alignItems="center"
      p="2"
      bg="primary"
      color="white"
      justifyContent="space-between"
      w="100%"
      position="fixed"
      zIndex="10"
      top="0"
    >
      <Link as={RouterLink} to="/">
        <Heading
          fontFamily="logo"
          fontWeight="300"
          fontSize="3xl"
          color="secondary"
        >
          THE NEXUS
        </Heading>
      </Link>
      <IconButton
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
