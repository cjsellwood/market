import {
  Grid,
  Flex,
  Heading,
  Text,
  Image,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { Product } from "../../store/productSlice";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = (props: { product: Product }) => {
  const { images, title, description, price, location, listed, product_id } =
    props.product;

  return (
    <LinkBox>
      <Grid
        m="1"
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
          <LinkOverlay to={`/products/${product_id}`} as={RouterLink}>
            <Heading fontSize="1rem" noOfLines={1}>
              {title}
            </Heading>
          </LinkOverlay>
          <Text fontSize="0.8rem" noOfLines={2}>
            {description}
          </Text>
          <Heading fontSize="1rem">${price}</Heading>
          <Text fontSize="0.8rem" noOfLines={1}>
            {location} - {new Date(listed).toLocaleDateString()}
          </Text>
        </Flex>
      </Grid>
    </LinkBox>
  );
};

export default ProductCard;
