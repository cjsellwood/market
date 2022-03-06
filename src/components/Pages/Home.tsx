import { Grid, Link, Flex, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getRandom } from "../../store/productThunks";
import ProductCard from "../Parts/ProductCard";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandom());
  }, [dispatch]);

  const { products } = useAppSelector((state) => state.product);

  return (
    <Grid templateColumns="1fr" pt="2">
      {products.map((product) => {
        return <ProductCard product={product} key={product.product_id} />;
      })}
      <Flex justifyContent="center" m="2">
        <Link to="/products" as={RouterLink}>
          <Button bg="blue.200">See more</Button>
        </Link>
      </Flex>
    </Grid>
  );
};

export default Home;
