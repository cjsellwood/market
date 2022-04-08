import {
  Grid,
  Flex,
  Heading,
  Text,
  Image,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
  AspectRatio,
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
        templateColumns="minmax(120px, 1fr) 3fr"
        borderRadius="4"
        boxShadow="md"
        backgroundColor={cardBackground}
        overflow="hidden"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
        >
          <AspectRatio ratio={1 / 1} width="100%">
            {image ? (
              <Image src={image} alt={title} objectFit="cover" />
            ) : (
              <Text color={secondaryText} fontSize="sm">
                No Image
              </Text>
            )}
          </AspectRatio>
        </Flex>
        <Flex direction="column" p="1.5">
          <LinkOverlay to={`/products/${product_id}`} as={RouterLink}>
            <Heading fontSize="1rem" fontWeight="500" noOfLines={1}>
              {title}
            </Heading>
          </LinkOverlay>
          <Text fontSize="0.8rem" noOfLines={2} color={secondaryText}>
            {description}
          </Text>
          <Text flexGrow="1"></Text>
          <Heading fontSize="1rem" fontWeight="500">
            ${price}
          </Heading>
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
