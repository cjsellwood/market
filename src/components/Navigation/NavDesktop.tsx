import {
  Divider,
  Flex,
  Link,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { categories } from "../../categories";
import useAppDispatch from "../../hooks/useAppDispatch";
import { logOutUser } from "../../store/authSlice";
import ShowToLoggedIn from "./ShowToLoggedIn";
import ShowToUnauthorized from "./ShowToUnauthorized";

const NavDesktop = () => {
  const dispatch = useAppDispatch();

  const background = useColorModeValue("#e3e8f2", "#1c2026");
  const divider = useColorModeValue("#c7c7c7", "#454545");

  const toast = useToast();
  return (
    <Flex
      bg={background}
      direction="column"
      minHeight="100vh"
      marginTop="-56px"
      paddingTop="56px"
      position="fixed"
      width="320px"
    >
      <Flex paddingTop="16" direction="column" p="6">
        <Flex justifyContent="space-evenly" marginX="-3">
          <ShowToUnauthorized>
            <Link
              to="/login"
              as={RouterLink}
              variant="link-button"
              w="50%"
              _hover={{ backgroundColor: "#8787873b" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              as={RouterLink}
              variant="link-button"
              w="50%"
              _hover={{ backgroundColor: "#8787873b" }}
            >
              Register
            </Link>
          </ShowToUnauthorized>
          <ShowToLoggedIn>
            <Link
              to="/new"
              as={RouterLink}
              variant="link-button"
              paddingX="2"
              marginX="1.5"
              w="50%"
              _hover={{ backgroundColor: "#8787873b" }}
            >
              New Product
            </Link>
            <Link
              to="/products/yours"
              as={RouterLink}
              variant="link-button"
              marginX="1.5"
              paddingX="2"
              w="50%"
              _hover={{ backgroundColor: "#8787873b" }}
            >
              My Products
            </Link>
          </ShowToLoggedIn>
        </Flex>
        <Flex marginTop="4" flexDirection="column">
          <Link
            to="/products"
            as={RouterLink}
            fontWeight="500"
            fontSize="1.2rem"
            p="2"
            _hover={{
              backgroundColor: "#8787873b",
            }}
          >
            All Products
          </Link>
          <Divider
            borderColor={divider}
            height="0px"
            borderBottomWidth="3px"
          />
          {categories.map((category) => {
            return (
              <React.Fragment key={category}>
                <Link
                  to={`/${category.toLowerCase().split(" ").join("")}`}
                  as={RouterLink}
                  fontWeight="500"
                  fontSize="lg"
                  p="2"
                  _hover={{
                    backgroundColor: "#8787873b",
                  }}
                >
                  {category}
                </Link>
                <Divider
                  borderColor={divider}
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
              _hover={{ backgroundColor: "#8787873b" }}
            >
              Log Out
            </Link>
          </Flex>
        </ShowToLoggedIn>
      </Flex>
    </Flex>
  );
};

export default NavDesktop;
