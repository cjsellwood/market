import { Flex, Grid, Spinner, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getSearch } from "../../store/productThunks";
import PageButtons from "../Navigation/PageButtons";
import ProductCard from "../Parts/ProductCard";

const Searched = () => {
  // Get page from url if included
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | null>("");

  // Set page whenever page in url changes
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setQuery(searchParams.get("q"));
  }, [searchParams]);

  const dispatch = useAppDispatch();

  // Fetch products for a page
  useEffect(() => {
    if (query) {
      dispatch(getSearch({ q: query, page: Number(page) }));
    }
  }, [dispatch, page, query]);

  const { products, loading, error, count } = useAppSelector(
    (state) => state.product
  );

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
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
      </Flex>
    );
  }

  return (
    <Grid templateColumns="1fr" pt="2">
      {!query && <Text>Search for a product</Text>}
      {query && !products.length && !error && <Text>No results</Text>}
      {query &&
        products.map((product) => {
          return <ProductCard product={product} key={product.product_id} />;
        })}
      <Flex justifyContent="center" m="2">
        {query && products.length ? (
          <PageButtons
            page={page}
            count={count}
            urlPrefix={"search"}
            query={query}
          />
        ) : null}
      </Flex>
    </Grid>
  );
};

export default Searched;
