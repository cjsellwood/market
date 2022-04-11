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
            <Link to="/login" as={RouterLink} variant="link-button" w="50%">
              Login
            </Link>
            <Link to="/register" as={RouterLink} variant="link-button" w="50%">
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
            >
              My Products
            </Link>
          </ShowToLoggedIn>
        </Flex>
        <Flex
          marginTop="4"
          flexDirection="column"
          //  bg="#bdbdbd63"
        >
          <Link
            to="/products"
            as={RouterLink}
            fontWeight="500"
            fontSize="1.2rem"
            p="2"
          >
            All Products
          </Link>
          <Divider backgroundColor={divider} height="2px" />
          {categories.map((category) => {
            return (
              <React.Fragment key={category}>
                <Link
                  to={`/${category.toLowerCase().split(" ").join("")}`}
                  as={RouterLink}
                  fontWeight="500"
                  fontSize="lg"
                  p="2"
                >
                  {category}
                </Link>
                <Divider backgroundColor={divider} height="2px" />
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
