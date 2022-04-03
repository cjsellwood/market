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
      bg="blue.200"
      justifyContent="space-between"
      w="100%"
      position="fixed"
      zIndex="10"
      top="0"
    >
      <Link as={RouterLink} to="/">
        <Heading>The Nexus</Heading>
      </Link>
      <IconButton
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon boxSize="7" />}
      />
      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default NavBar;
