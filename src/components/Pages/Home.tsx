import { Link, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getRandom } from "../../store/productThunks";
import ProductCard from "../Parts/ProductCard";
import { Link as RouterLink } from "react-router-dom";
import SearchBox from "../Parts/SearchBox";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandom());
  }, [dispatch]);

  const { products } = useAppSelector((state) => state.product);

  return (
    <Flex justifyContent="center">
      <Flex maxWidth="860px" direction="column" p={{ base: "0.5", lg: "4" }}>
        <SearchBox />
        {products.map((product) => {
          return <ProductCard product={product} key={product.product_id} />;
        })}
        <Flex justifyContent="center" m="2">
          <Link
            to="/products"
            as={RouterLink}
            w="50%"
            maxWidth="200px"
            variant="link-button"
          >
            See more
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
