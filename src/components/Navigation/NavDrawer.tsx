import { SunIcon } from "@chakra-ui/icons";
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
  useColorMode,
  Icon,
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

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Button
          onClick={() => {
            toggleColorMode();
            onClose();
          }}
          aria-label="toggle theme"
          position="absolute"
          left="12px"
          top="8px"
          width="40px"
        >
          {colorMode === "light" ? (
            <Icon boxSize="5" viewBox="0 0 16 16" data-testid="moon">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
            </Icon>
          ) : (
            <SunIcon boxSize="5" data-testid="sun"/>
          )}
        </Button>
        <DrawerCloseButton size="lg" aria-label="close menu" />
        <DrawerBody paddingTop="16">
          <Flex justifyContent="space-evenly">
            <ShowToUnauthorized>
              <Link to="/login" as={RouterLink} w="100%" onClick={onClose}>
                <Flex justifyContent="center">
                  <Button w="80%" tabIndex={-1}>
                    Login
                  </Button>
                </Flex>
              </Link>
              <Link to="/register" as={RouterLink} w="100%" onClick={onClose}>
                <Flex justifyContent="center">
                  <Button w="80%" tabIndex={-1}>Register</Button>
                </Flex>
              </Link>
            </ShowToUnauthorized>
            <ShowToLoggedIn>
              <Link to="/new" as={RouterLink} w="100%" onClick={onClose}>
                <Flex justifyContent="center">
                  <Button tabIndex={-1}>New Product</Button>
                </Flex>
              </Link>
              <Link
                to="/products/yours"
                as={RouterLink}
                w="100%"
                onClick={onClose}
              >
                <Flex justifyContent="center">
                  <Button tabIndex={-1}>Your Products</Button>
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
            <Flex justifyContent="space-evenly" paddingTop="8" w="100%">
              <Link to="" as={RouterLink}  onClick={onClose}>
                <Flex justifyContent="center">
                  <Button onClick={() => dispatch(logOutUser())} tabIndex={-1}>
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
