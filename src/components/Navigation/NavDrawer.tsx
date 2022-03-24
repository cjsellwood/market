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
import { categories } from "../../categories";
import useAppDispatch from "../../hooks/useAppDispatch";
import { logOutUser } from "../../store/authSlice";
import ShowToLoggedIn from "./ShowToLoggedIn";
import ShowToUnauthorized from "./ShowToUnauthorized";

const NavDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" aria-label="close menu" />
        <DrawerBody paddingTop="16">
          <Flex justifyContent="space-evenly">
            <ShowToUnauthorized>
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
            </ShowToUnauthorized>
            <ShowToLoggedIn>
              <Link to="/new" as={RouterLink} w="100%" onClick={onClose}>
                <Flex justifyContent="center">
                  <Button>New Product</Button>
                </Flex>
              </Link>
            </ShowToLoggedIn>
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
          <ShowToLoggedIn>
            <Flex justifyContent="space-evenly" paddingTop="8">
              <Link to="" as={RouterLink} w="100%" onClick={onClose}>
                <Flex justifyContent="center">
                  <Button onClick={() => dispatch(logOutUser())}>
                    Log Out
                  </Button>
                </Flex>
              </Link>
            </Flex>
          </ShowToLoggedIn>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
