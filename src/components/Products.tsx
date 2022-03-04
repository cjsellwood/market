import { Button, Flex, Grid, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { Link as RouterLink } from "react-router-dom";
import { getAll } from "../store/productThunks";
import useAppSelector from "../hooks/useAppSelector";
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAll({ page }));
  }, [dispatch, page]);

  const { products, loading, error } = useAppSelector((state) => state.product);

  // Show any errors
  const toast = useToast();
  const toastId = "error-toast";
  useEffect(() => {
    console.log(error);
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
      <Flex justifyContent="center" m="2"></Flex>
    </Grid>
  );
};

export default Products;
