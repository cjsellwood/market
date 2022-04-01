import { Flex, FormLabel, Select } from "@chakra-ui/react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { setSort } from "../../store/productSlice";

const SortSelect = () => {
  const { sort } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <Flex justifyContent="center" alignItems="center">
      <FormLabel fontSize="sm" m="0" marginRight="1">
        Sort by:
      </FormLabel>
      <Select
        aria-label="select sort"
        size="sm"
        w="auto"
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="no">Date: New to Old</option>
        <option value="on">Date: Old to New</option>
        <option value="lh">Price: Low to High</option>
        <option value="hl">Price: High to Low</option>
      </Select>
    </Flex>
  );
};

export default SortSelect;
