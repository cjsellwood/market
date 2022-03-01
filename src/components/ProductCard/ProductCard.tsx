import { Grid, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { Product } from "../../store/productSlice";

const ProductCard = (props: { product: Product }) => {
  const { product_id, images, title, description, price, location, listed } =
    props.product;
  return (
    <Grid
      m="1"
      key={product_id}
      templateColumns="120px 1fr"
      borderRadius="4"
      bg="white"
      boxShadow="base"
      overflow="hidden"
    >
      <Flex alignItems="center">
        <Image src={images[0]} alt={title} objectFit="cover" />
      </Flex>
      <Flex direction="column" p="1">
        <Heading fontSize="1rem" noOfLines={1}>
          {title}
        </Heading>
        <Text fontSize="0.8rem" noOfLines={2}>
          {description}
        </Text>
        <Heading fontSize="1rem">${price}</Heading>
        <Text fontSize="0.8rem" noOfLines={1}>
          {location} - {new Date(listed).toLocaleDateString()}
        </Text>
      </Flex>
    </Grid>
  );
};

export default ProductCard;
