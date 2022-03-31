import { Flex, Grid, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getAll } from "../../store/productThunks";
import useAppSelector from "../../hooks/useAppSelector";
import ProductCard from "../Parts/ProductCard";
import PageButtons from "../Navigation/PageButtons";
import SearchBox from "../Parts/SearchBox";
import SortSelect from "../Parts/SortSelect";

const Products = () => {
  // Get page from url if included
  const [searchParams] = useSearchParams();

  const { sort } = useAppSelector((state) => state.product);

  // Set page whenever page in url changes
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  // Fetch products for a page
  useEffect(() => {
    dispatch(
      getAll({
        page: Number(page),
        sort: sort,
        count: count === "0" ? undefined : count,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, sort]);

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
      <SearchBox />
      <SortSelect />
      {products.map((product) => {
        return <ProductCard product={product} key={product.product_id} />;
      })}
      <Flex justifyContent="center" m="2">
        <PageButtons page={page} count={count} urlPrefix={"products"} />
      </Flex>
    </Grid>
  );
};

export default Products;
