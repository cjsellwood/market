import {
  Flex,
  Link,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
  DrawerContent,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const categories = [
    "Cars",
    "Clothing",
    "Computers",
    "Electronics",
    "Food and Drink",
    "Home and Garden",
    "Sports",
  ];

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" aria-label="close menu" />
        <DrawerBody paddingTop="16">
          <Flex justifyContent="space-evenly">
            <Link to="/login" as={RouterLink} w="100%" onClick={onClose}>
              <Flex justifyContent="center">
                <Button w="80%">Login</Button>
              </Flex>
            </Link>
            <Link to="/register" as={RouterLink} w="100%" onClick={onClose}>
              <Flex justifyContent="center">
                <Button w="80%">Register</Button>
              </Flex>
            </Link>
          </Flex>
          <VStack paddingTop="4">
            <Link to="/products" as={RouterLink} onClick={onClose}>
              All Products
            </Link>
            {categories.map((category) => {
              return (
                <Link
                  key={category}
                  to={`/${category.toLowerCase().split(" ").join("")}`}
                  as={RouterLink}
                  onClick={onClose}
                >
                  {category}
                </Link>
              );
            })}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
