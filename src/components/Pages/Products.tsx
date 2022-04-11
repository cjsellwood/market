import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getAll } from "../../store/productThunks";
import useAppSelector from "../../hooks/useAppSelector";
import ProductCard from "../Parts/ProductCard";
import PageButtons from "../Navigation/PageButtons";
import SearchBox from "../Parts/SearchBox";
import SortSelect from "../Parts/SortSelect";
import Loading from "../Parts/Loading";

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
      <Loading/>

    );
  }

  return (
    <Flex justifyContent="center">
      <Flex maxWidth="860px" direction="column" p={{ base: "0.5", lg: "4" }}>
        <SearchBox />
        {products.length !== 0 && <SortSelect setPage={setPage} />}
        {products.map((product) => {
          return <ProductCard product={product} key={product.product_id} />;
        })}
        <Flex justifyContent="center" m="2">
          <PageButtons page={page} count={count} urlPrefix={"products"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Products;
