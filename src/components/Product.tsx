import { Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getProduct } from "../store/productSlice";
import { Link as RouterLink } from "react-router-dom";

const Product = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(Number(id)));
  }, [dispatch, id]);

  if (!product) {
    return <Flex></Flex>;
  }
  return (
    <Flex direction="column">
      <Image src={product.images[0]} alt={product.title} />
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
