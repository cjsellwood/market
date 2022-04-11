import { Link, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getRandom } from "../../store/productThunks";
import ProductCard from "../Parts/ProductCard";
import { Link as RouterLink } from "react-router-dom";
import SearchBox from "../Parts/SearchBox";
import Loading from "../Parts/Loading";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandom());
  }, [dispatch]);

  const { products, loading, error } = useAppSelector((state) => state.product);

  // Show any errors
  const toast = useToast();
  const toastId = "error-toast";
  useEffect(() => {
    if (error && !toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [error, toast]);

  // Show loading spinner
  if (loading) {
    return <Loading />;
  }

  return (
    <Flex justifyContent="center">
      <Flex
        maxWidth="860px"
        width="100%"
        direction="column"
        p={{ base: "0.5", lg: "4" }}
      >
        <SearchBox />
        {products.map((product) => {
          return <ProductCard product={product} key={product.product_id} />;
        })}
        {products.length !== 0 && (
          <Flex justifyContent="center" m="2">
            <Link
              to="/products"
              as={RouterLink}
              w="50%"
              maxWidth="200px"
              variant="link-button"
              _hover={{
                backgroundColor: "#8787873b",
              }}
            >
              See more
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
