import {
  Grid,
  Flex,
  Heading,
  Text,
  Image,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
} from "@chakra-ui/react";
import { Product } from "../../store/productSlice";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = (props: { product: Product }) => {
  const { image, title, description, price, location, listed, product_id } =
    props.product;

  const secondaryText = useColorModeValue("secondaryText", "secondaryTextDark");
  const cardBackground = useColorModeValue("card", "cardDark");

  return (
    <LinkBox>
      <Grid
        m="1"
        marginBottom="2"
        templateColumns="120px 1fr"
        borderRadius="4"
        boxShadow="md"
        backgroundColor={cardBackground}
        overflow="hidden"
      >
        <Flex alignItems="center" minHeight="120px">
          <Image src={image} alt={title} objectFit="cover" />
        </Flex>
        <Flex direction="column" p="1">
          <LinkOverlay to={`/products/${product_id}`} as={RouterLink}>
            <Heading fontSize="1rem" fontWeight="bold" noOfLines={1}>
              {title}
            </Heading>
          </LinkOverlay>
          <Text fontSize="0.8rem" noOfLines={2} color={secondaryText}>
            {description}
          </Text>
          <Text flexGrow="1"></Text>
          <Heading fontSize="1rem">${price}</Heading>
          <Flex justifyContent="space-between">
            <Text fontSize="0.8rem" noOfLines={1} color={secondaryText}>
              {location}
            </Text>
            <Text
              fontSize="0.8rem"
              noOfLines={1}
              color={secondaryText}
              flexShrink="0"
            >
              {new Date(listed).toLocaleDateString()}
            </Text>
          </Flex>
        </Flex>
      </Grid>
    </LinkBox>
  );
};

export default ProductCard;
