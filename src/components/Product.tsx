import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getProduct } from "../store/productSlice";

const Product = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    dispatch(getProduct(Number(id)));
  }, [dispatch]);

  if (!product) {
    return <Flex></Flex>;
  }
  return (
    <Flex direction="column">
      <Image src={product.images[0]} alt={product.title} />
      <Heading>{product.title}</Heading>
      <Text>{product.description}</Text>
      <Heading fontSize="1rem">${product.price}</Heading>
      <Text fontSize="0.8rem">
        {product.location} - {new Date(product.listed).toLocaleDateString()}
      </Text>
    </Flex>
  );
};

export default Product;
