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

  const message = useInput("", "message", "Message", {
    isRequired: true,
    maxLength: 1000,
  });

  // Send new message
  const submitMessage = async () => {
    const isValid = message.isValid();

    if (!isValid) {
      return;
    }

    // Render immediately
    const messageText = message.value;
    message.setValue("");
    const result = await dispatch(
      sendMessage({
        text: messageText,
        product_id: product!.product_id,
        sender: userId!,
        receiver: product!.user_id,
      })
    );
    window.scrollTo(0, 100000000000000);

    // If failed to save message reset to before submit
    if (result.meta.requestStatus !== "fulfilled") {
      message.setValue(messageText);
    }
  };

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
                {product.messages?.map((message, i) => {
                  return (
                    <Flex
                      direction="column"
                      key={"message" + i}
                      border="1px solid gray"
                      m="1"
                      p="1"
                      borderRadius="4"
                      marginLeft={
                        message.sender !== product.user_id ? "8" : "1"
                      }
                      marginRight={
                        message.sender === product.user_id ? "8" : "1"
                      }
                    >
                      <Text wordBreak="break-word">{message.text}</Text>
                      <Flex fontSize="sm">
                        {new Date(message.time).toLocaleTimeString("en-US")}{" "}
                        {new Date(message.time).toLocaleDateString()}
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
              <Flex direction="column" p="1">
                <CustomInput
                  id={message.id}
                  value={message.value}
                  placeholder="Make an offer or ask a question"
                  label={message.label}
                  error={message.error}
                  onChange={message.onChange}
                  textArea
                  hideLabel
                />
                <Button
                  colorScheme="green"
                  w="fit-content"
                  m="1"
                  onClick={submitMessage}
                  alignSelf="flex-end"
                  aria-label="send message"
                >
                  Send
                </Button>
              </Flex>
            </Flex>
          )}
        </ShowToLoggedIn>
        <ShowToAuthor authorId={product.user_id}>
          <Flex direction="column" w="100%">
            <Heading>Messages</Heading>
            <Accordion allowToggle>
              {Array.from(groupByUser(product.messages!, product.user_id)).map(
                (conversation) => (
                  <AccordionItem key={conversation[0]}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {conversation[0]}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      {conversation[1].map((message: Message, i: number) => (
                        <Flex
                          direction="column"
                          key={conversation[0] + "message" + i}
                          border="1px solid gray"
                          m="1"
                          p="1"
                          borderRadius="4"
                          marginLeft={
                            message.sender !== product.user_id ? "8" : "1"
                          }
                          marginRight={
                            message.sender === product.user_id ? "8" : "1"
                          }
                        >
                          <Text wordBreak="break-word">{message.text}</Text>
                          <Flex fontSize="sm">
                            {new Date(message.time).toLocaleTimeString("en-US")}{" "}
                            {new Date(message.time).toLocaleDateString()}
                          </Flex>
                        </Flex>
                      ))}
                      <Flex direction="column" p="1">
                        <CustomInput
                          id={message.id}
                          value={message.value}
                          placeholder="Make an offer or ask a question"
                          label={message.label}
                          error={message.error}
                          onChange={message.onChange}
                          textArea
                          hideLabel
                        />
                        <Button
                          colorScheme="green"
                          w="fit-content"
                          m="1"
                          onClick={submitMessage}
                          alignSelf="flex-end"
                          aria-label="send message"
                        >
                          Send
                        </Button>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </Flex>
        </ShowToAuthor>
      </Flex>
    </Flex>
  );
};

export default Product;
