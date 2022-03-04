import {
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Spinner,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getProduct } from "../store/productThunks";
import { Link as RouterLink } from "react-router-dom";

const Product = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(Number(id)));
  }, [dispatch, id]);

  const [imageShown, setImageShown] = useState(0);

  if (!product) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
      </Flex>
    );
  }

  return (
    <Flex direction="column">
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
        to={`/products/${product.category!.toLowerCase().split(" ").join("")}`}
        as={RouterLink}
      >
        {product.category}
      </Link>
      <Text>{product.description}</Text>
      <Heading fontSize="1rem">${product.price}</Heading>
      <Text fontSize="0.8rem">
        {product.location} - {new Date(product.listed).toLocaleDateString()}
      </Text>
    </Flex>
  );
};

export default Product;