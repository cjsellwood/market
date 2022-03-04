import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Spinner,
  useQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { Link as RouterLink } from "react-router-dom";
import { getAll } from "../store/productThunks";
import useAppSelector from "../hooks/useAppSelector";
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  // Get page from url if included
  const [searchParams, setSearchParams] = useSearchParams();

  // Set page whenever page in url changes
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  // Fetch products for a page
  useEffect(() => {
    dispatch(getAll({ page: Number(page) }));
  }, [dispatch, page, searchParams]);

  const { products, loading, error, count } = useAppSelector(
    (state) => state.product
  );

  console.log(count);

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

  const navigate = useNavigate();

  // Show loading spinner
  if (loading) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
      </Flex>
    );
  }

  return (
    <Grid templateColumns="1fr" pt="2">
      {products.map((product) => {
        return <ProductCard product={product} key={product.product_id} />;
      })}
      <Flex justifyContent="center" m="2">
        <ButtonGroup colorScheme="blue" size="sm">
          <Button
            onClick={() => {
              if (page === 1) {
                return;
              }
              window.scrollTo(0, 0);
              navigate(`/products?page=${page - 1}`);
            }}
            aria-label="Previous Page"
          >
            &lt;
          </Button>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/products");
            }}
            aria-label="Page 1"
            outline={page === 1 ? "2px solid red" : "none"}
          >
            1
          </Button>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/products?page=2");
            }}
            aria-label="Page 2"
            outline={page === 2 ? "2px solid red" : "none"}
          >
            2
          </Button>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/products?page=3");
            }}
            aria-label="Page 3"
            outline={page === 3 ? "2px solid red" : "none"}
          >
            3
          </Button>
          <Button
            onClick={() => {
              if (page === 3) {
                return;
              }
              window.scrollTo(0, 0);
              navigate(`/products?page=${page + 1}`);
            }}
            aria-label="Previous Page"
          >
            &gt;
          </Button>
        </ButtonGroup>
      </Flex>
    </Grid>
  );
};

export default Products;
