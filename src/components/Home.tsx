import { Grid} from "@chakra-ui/react";
import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getRandom } from "../store/productSlice";
import ProductCard from "./ProductCard/ProductCard";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandom());
  }, [dispatch]);

  const { products } = useAppSelector((state) => state.product);

  return (
    <Grid templateColumns="1fr">
      {products.map((product) => {
        return <ProductCard product={product} />;
      })}
    </Grid>
  );
};

export default Home;
