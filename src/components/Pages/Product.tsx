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
  useColorModeValue,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getProduct, deleteProduct } from "../../store/productThunks";
import { Link as RouterLink } from "react-router-dom";
import SearchBox from "../Parts/SearchBox";
import ShowToAuthor from "../Navigation/ShowToAuthor";
import ShowToUnauthorized from "../Navigation/ShowToUnauthorized";
import ShowToLoggedIn from "../Navigation/ShowToLoggedIn";
import groupByUser from "../functions/groupByUser";
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
      navigate("/products/yours");
      toast({
        title: "Successfully deleted",
        duration: 5000,
        position: "top",
        status: "success",
        isClosable: true,
      });
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

  const selectBorderColor = useColorModeValue("#b0b0b0", "#4a4a4a");
  const fileButtonTextColor = useColorModeValue("#000", "#fff");
  const secondaryTextColor = useColorModeValue(
    "secondaryText",
    "secondaryTextDark"
  );

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
    <Flex justifyContent="center">
      <Flex
        maxWidth="860px"
        direction="column"
        p={{ base: "0.5", lg: "4" }}
        width="100%"
      >
        <SearchBox />
        <Breadcrumb
          separator=">"
          paddingX="4"
          paddingTop="2"
          color={secondaryTextColor}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/products">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={RouterLink}
              to={`/${product.category!.toLowerCase().split(" ").join("")}`}
            >
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading fontSize="2xl" paddingX="4" paddingY="3" fontWeight="500">
          {product.title}
        </Heading>
        <Flex justifyContent="center" marginX="-0.5">
          <Flex
            justifyContent="center"
            bg="rgb(10, 10, 10)"
            width="100%"
            height="0"
            overflow="hidden"
            paddingTop="100%"
            position="relative"
          >
            {(product.images as string[]).map((image, i) => {
              return (
                <Image
                  src={image}
                  objectFit="contain"
                  alt={`${product.title} ${i + 1}`}
                  display={imageShown === i ? "block" : "none"}
                  key={`${product.title} ${i}`}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                />
              );
            })}
          </Flex>
        </Flex>
        <ButtonGroup justifyContent="center" p="2">
          {product.images!.map((image, i) => {
            return (
              <Button
                onClick={() => setImageShown(i)}
                aria-label={`Image ${i + 1}`}
                key={`Image ${i + 1}`}
                backgroundColor={imageShown === i ? "#e5067d" : "#060698"}
                variant="image-button"
                className="no-highlight"
              >
                {i + 1}
              </Button>
            );
          })}
        </ButtonGroup>
        <Box paddingX="4">
          <Divider marginBottom="2" borderColor="#858585" />
          <Flex alignItems="center" justifyContent="center" paddingBottom="2">
            <Heading fontSize="3xl" fontWeight="500">
              ${product.price}
            </Heading>
          </Flex>
          <Text>{product.description}</Text>
          <Text fontSize="md" lineHeight="2" paddingTop="2">
            <Text as="span" fontWeight="500" display="inline">
              Location:
            </Text>{" "}
            {product.location}
          </Text>
          <Text fontSize="md" lineHeight="2">
            <Text as="span" fontWeight="500" display="inline">
              Listed:
            </Text>{" "}
            {new Date(product.listed).toLocaleDateString()}
          </Text>
        </Box>
        <ShowToAuthor authorId={product.user_id}>
          <Flex p="2" justifyContent="space-evenly">
            <Link
              to={`/products/${id}/edit`}
              as={RouterLink}
              variant="neutral-link"
              color={fileButtonTextColor}
              borderColor={selectBorderColor}
              w="50%"
              maxWidth="200px"
            >
              Edit
            </Link>
            <Button
              onClick={handleDelete}
              isLoading={loading}
              aria-label="delete product"
              variant="neutral-button"
              color={fileButtonTextColor}
              borderColor={selectBorderColor}
              w="50%"
              maxWidth="200px"
            >
              Delete
            </Button>
          </Flex>
        </ShowToAuthor>
        <Flex flexDirection="column">
          <ShowToUnauthorized>
            <Button
              onClick={() => {
                navigate("/login", {
                  replace: true,
                  state: { from: location },
                });
              }}
              aria-label="link to login"
              variant="link-button"
              marginY="1.5"
              w="70%"
              alignSelf="center"
            >
              Login to send a message
            </Button>
          </ShowToUnauthorized>
          <ShowToLoggedIn>
            {product.user_id !== userId && (
              <Flex direction="column" w="100%" paddingX="3">
                <Divider marginY="2" borderColor="#858585" />
                <Heading textAlign="center" fontWeight="500" fontSize="2xl">
                  Messages
                </Heading>
                <Flex justifyContent="center" marginTop={{ base: 0, lg: "2" }}>
                  <Flex direction="column" maxWidth="600px" width="100%">
                    <Conversation
                      messages={product.messages!}
                      product_id={product.product_id}
                      author_id={product.user_id}
                    />
                  </Flex>
                </Flex>
              </Flex>
            )}
          </ShowToLoggedIn>
          <ShowToAuthor authorId={product.user_id}>
            <Divider marginY="2" borderColor="#858585" />
            <Flex direction="column" w="100%">
              <Heading
                textAlign="center"
                fontWeight="500"
                fontSize="2xl"
                paddingBottom="2"
              >
                Messages
              </Heading>
              {product.messages && !product.messages.length && (
                <Flex justifyContent="center" alignItems="center" p="2">
                  <Text>No Messages</Text>
                </Flex>
              )}
              <Accordion
                allowToggle
                defaultIndex={0}
                marginTop={{ base: 0, lg: "2" }}
              >
                {Array.from(
                  groupByUser(product.messages!, product.user_id)
                ).map((conversation, i) => {
                  return (
                    <Flex justifyContent="center" key={conversation[0] + i}>
                      <Flex
                        maxWidth="600px"
                        flexDirection="column"
                        width="100%"
                        borderColor={selectBorderColor}
                        borderLeftWidth={{ base: 0, md: 1 }}
                        borderRightWidth={{ base: 0, md: 1 }}
                        marginBottom="-1px"
                      >
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex="1" textAlign="center" fontSize="lg">
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
                      </Flex>
                    </Flex>
                  );
                })}
              </Accordion>
            </Flex>
          </ShowToAuthor>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
