import { Flex, Grid, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { categories } from "../../categories";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getCategory } from "../../store/productThunks";
import PageButtons from "../Navigation/PageButtons";
import ProductCard from "../Parts/ProductCard";

const Category = () => {
  // Get page from url if included
  const [searchParams] = useSearchParams();

  // Set page whenever page in url changes
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  // Get category_id from url
  const { category } = useParams();
  const category_id =
    1 +
    categories.findIndex(
      (el) => el.toLowerCase().split(" ").join("") === category
    );

  // Fetch products for a page
  useEffect(() => {
    dispatch(getCategory({ category_id, page: Number(page) }));
  }, [dispatch, page, category_id]);

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
      {products.map((product) => {
        return <ProductCard product={product} key={product.product_id} />;
      })}
      <Flex justifyContent="center" m="2">
        {products.length ? (
          <PageButtons
            page={page}
            count={count}
            urlPrefix={`products/category/${category_id}`}
          />
        ) : null}
      </Flex>
    </Grid>
  );
};

export default Category;
