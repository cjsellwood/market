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
  useColorMode,
  Icon,
  useColorModeValue,
  useToast,
  Divider,
} from "@chakra-ui/react";
import React from "react";
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
  const background = useColorModeValue("mainBackground", "mainBackgroundDark");

  const toast = useToast();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={background} data-testid="drawer">
        <Button
          onClick={() => {
            toggleColorMode();
            onClose();
          }}
          aria-label="toggle theme"
          bg="transparent"
          position="absolute"
          left="12px"
          top="8px"
          width="40px"
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
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
        <DrawerCloseButton
          size="lg"
          aria-label="close menu"
          color="secondary"
          tabIndex={1}
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
        />
        <DrawerBody paddingTop="16">
          <Flex justifyContent="space-evenly" marginX="-3">
            <ShowToUnauthorized>
              <Link
                to="/login"
                as={RouterLink}
                onClick={onClose}
                variant="link-button"
                w="50%"
              >
                Login
              </Link>
              <Link
                to="/register"
                as={RouterLink}
                onClick={onClose}
                variant="link-button"
                w="50%"
              >
                Register
              </Link>
            </ShowToUnauthorized>
            <ShowToLoggedIn>
              <Link
                to="/new"
                as={RouterLink}
                onClick={onClose}
                variant="link-button"
                paddingX="2"
                marginX="1.5"
                w="50%"
              >
                New Product
              </Link>
              <Link
                to="/products/yours"
                as={RouterLink}
                onClick={onClose}
                variant="link-button"
                marginX="1.5"
                paddingX="2"
                w="50%"
              >
                My Products
              </Link>
            </ShowToLoggedIn>
          </Flex>
          <Flex marginTop="4" flexDirection="column">
            <Link
              to="/products"
              as={RouterLink}
              onClick={onClose}
              bg={background}
              fontWeight="500"
              fontSize="1.2rem"
              p="2"
            >
              All Products
            </Link>
            <Divider
              borderColor="#bdbdbd63"
              height="0px"
              borderBottomWidth="3px"
            />
            {categories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <Link
                    to={`/${category.toLowerCase().split(" ").join("")}`}
                    as={RouterLink}
                    onClick={onClose}
                    bg={background}
                    fontWeight="500"
                    fontSize="lg"
                    p="2"
                  >
                    {category}
                  </Link>
                  <Divider
                    borderColor="#bdbdbd63"
                    height="0px"
                    borderBottomWidth="3px"
                  />
                </React.Fragment>
              );
            })}
          </Flex>
          <ShowToLoggedIn>
            <Flex justifyContent="center" paddingTop="8">
              <Link
                onClick={() => {
                  dispatch(logOutUser());
                  onClose();
                  toast({
                    title: "You are now logged out",
                    duration: 5000,
                    position: "top",
                    status: "success",
                    isClosable: true,
                  });
                }}
                variant="link-button"
                w="50%"
              >
                Log Out
              </Link>
            </Flex>
          </ShowToLoggedIn>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
