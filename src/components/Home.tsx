import { Flex, Grid, Heading, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getRandom } from "../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandom());
  }, [dispatch]);

  const { products } = useAppSelector((state) => state.product);

  return (
    <Grid templateColumns="1fr">
      {products.map((product) => {
        return (
          <Grid
            m="1"
            key={product.product_id}
            templateColumns="120px 1fr"
            borderRadius="4"
            bg="white"
            boxShadow="base"
            overflow="hidden"
          >
            <Flex alignItems="center">
              <Image
                src={product.images[0]}
                alt={product.title}
                objectFit="cover"
              />
            </Flex>
            <Flex direction="column" p="1">
              <Heading fontSize="1rem" noOfLines={1}>
                {product.title}
              </Heading>
              <Text fontSize="0.8rem" noOfLines={2}>
                {product.description}
              </Text>
              <Heading fontSize="1rem">${product.price}</Heading>
              <Text fontSize="0.8rem" noOfLines={1}>
                {product.location} -{" "}
                {new Date(product.listed).toLocaleDateString()}
              </Text>
            </Flex>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
