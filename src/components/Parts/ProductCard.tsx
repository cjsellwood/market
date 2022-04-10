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
    <Flex
      m="1"
      marginBottom="2"
      boxShadow="md"
      borderRadius="4"
      backgroundColor={cardBackground}
      overflow="hidden"
    >
      <LinkBox width="100%">
        <Grid templateColumns="minmax(120px, 1fr) 3fr">
          <Flex alignItems="center" justifyContent="center">
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
          <Flex direction="column" p={{ base: "1.5", xl: "3" }}>
            <LinkOverlay to={`/products/${product_id}`} as={RouterLink}>
              <Heading
                fontSize={{ base: "1rem", xl: "1.25rem" }}
                fontWeight="500"
                noOfLines={1}
                marginBottom={{ base: "0", xl: "1" }}
              >
                {title}
              </Heading>
            </LinkOverlay>
            <Text
              fontSize={{ base: "0.8rem", xl: "0.9rem" }}
              noOfLines={{ base: 2, xl: 4 }}
              color={secondaryText}
            >
              {description}
            </Text>
            <Text flexGrow="1"></Text>
            <Heading
              fontSize={{ base: "1rem", xl: "1.25rem" }}
              fontWeight="500"
              marginBottom={{ base: "0", xl: "1" }}
            >
              ${price}
            </Heading>
            <Flex justifyContent="space-between">
              <Text
                fontSize={{ base: "0.8rem", xl: "0.9rem" }}
                noOfLines={1}
                color={secondaryText}
              >
                {location}
              </Text>
              <Text
                fontSize={{ base: "0.8rem", xl: "0.9rem" }}
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
    </Flex>
  );
};

export default ProductCard;
