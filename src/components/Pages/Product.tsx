import {
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Spinner,
  ButtonGroup,
  Button,
  useToast,
  Accordion,
  AccordionItem,
  Box,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  getProduct,
  deleteProduct,
  sendMessage,
} from "../../store/productThunks";
import { Link as RouterLink } from "react-router-dom";
import SearchBox from "../Parts/SearchBox";
import ShowToAuthor from "../Navigation/ShowToAuthor";
import ShowToUnauthorized from "../Navigation/ShowToUnauthorized";
import ShowToLoggedIn from "../Navigation/ShowToLoggedIn";
import useInput from "../../hooks/useInput";
import CustomInput from "../Parts/CustomInput";
import groupByUser from "../functions/groupByUser";
import { Message } from "../../store/productSlice";
import Conversation from "../Parts/Conversation";

const Product = () => {
  const { product, loading, error } = useAppSelector((state) => state.product);
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(Number(id)));
  }, [dispatch, id]);

  const [imageShown, setImageShown] = useState(0);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await dispatch(deleteProduct(id!));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/products");
    }
  };

  const location = useLocation();

  // Show any errors
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [error, toast]);

  // If product loading
  if (loading && !product) {
    return (
      <Flex direction="column">
        <SearchBox />
        <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
        </Flex>
      </Flex>
    );
  }

  // If product not found
  if (!product) {
    return (
      <Flex direction="column">
        <SearchBox />
        <Flex justifyContent="center"></Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <SearchBox />
      <Flex h="66vh" justifyContent="center" bg="gray.300">
        {(product.images as string[]).map((image, i) => {
          return (
            <Image
              src={image}
              display={imageShown === i ? "block" : "none"}
              objectFit="contain"
              boxSize="66vh"
              alt={`${product.title} ${i + 1}`}
              key={`${product.title} ${i}`}
            />
          );
        })}
      </Flex>
      <ButtonGroup justifyContent="center" colorScheme="blue" p="1" size="sm">
        {product.images!.map((image, i) => {
          return (
            <Button
              onClick={() => setImageShown(i)}
              aria-label={`Image ${i + 1}`}
              key={`Image ${i + 1}`}
            >
              {i + 1}
            </Button>
          );
        })}
      </ButtonGroup>
      <Heading>{product.title}</Heading>
      <Link
        to={`/${product.category!.toLowerCase().split(" ").join("")}`}
        as={RouterLink}
      >
        {product.category}
      </Link>
      <Text>{product.description}</Text>
      <Heading fontSize="1rem">${product.price}</Heading>
      <Text fontSize="0.8rem">
        {product.location} - {new Date(product.listed).toLocaleDateString()}
      </Text>
      <ShowToAuthor authorId={product.user_id}>
        <Flex>
          <Link to={`/products/${id}/edit`} as={RouterLink}>
            <Flex justifyContent="center">
              <Button colorScheme="green">Edit</Button>
            </Flex>
          </Link>
          <Button onClick={handleDelete} colorScheme="red" isLoading={loading}>
            Delete
          </Button>
        </Flex>
      </ShowToAuthor>
      <Flex>
        <ShowToUnauthorized>
          <Button
            colorScheme="blue"
            onClick={() => {
              navigate("/login", { replace: true, state: { from: location } });
            }}
            aria-label="link to login"
          >
            Login to send a message
          </Button>
        </ShowToUnauthorized>
        <ShowToLoggedIn>
          {product.user_id !== userId && (
            <Flex direction="column" w="100%">
              <Heading>Messages</Heading>
              <Flex direction="column">
                <Conversation
                  messages={product.messages!}
                  product_id={product.product_id}
                  author_id={product.user_id}
                />
              </Flex>
            </Flex>
          )}
        </ShowToLoggedIn>
        <ShowToAuthor authorId={product.user_id}>
          <Flex direction="column" w="100%">
            <Heading>Messages</Heading>
            <Accordion allowToggle>
              {Array.from(groupByUser(product.messages!, product.user_id)).map(
                (conversation, i) => {
                  return (
                    <AccordionItem key={conversation[0] + i}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {conversation[0]}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <Conversation
                          messages={conversation[1]}
                          product_id={product.product_id}
                          author_id={product.user_id}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  );
                }
              )}
            </Accordion>
          </Flex>
        </ShowToAuthor>
      </Flex>
    </Flex>
  );
};

export default Product;
