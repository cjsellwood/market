import { Flex, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { setSort } from "../../store/productSlice";

const SortSelect = () => {
  const { sort } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const background = useColorModeValue("card", "cardDark");
  return (
    <Flex justifyContent="center" alignItems="center" p="2">
      <FormLabel
        fontSize="15px"
        m="0"
        marginRight="2"
        fontWeight="500"
        htmlFor="sort"
      >
        Sort by:
      </FormLabel>
      <Select
        id="sort"
        name="sort"
        aria-label="select sort"
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        border="none"
        background={background}
        borderRadius="4"
        size="sm"
        fontSize="15px"
        w="auto"
      >
        <option
          value="no"
          style={{
            backgroundColor:
              /* istanbul ignore next */
              background === "card" ? "white" : "rgb(39, 39, 42)",
          }}
        >
          Date: New to Old
        </option>
        <option
          value="on"
          style={{
            backgroundColor:
              /* istanbul ignore next */
              background === "card" ? "white" : "rgb(39, 39, 42)",
          }}
        >
          Date: Old to New
        </option>
        <option
          value="lh"
          style={{
            backgroundColor:
              /* istanbul ignore next */
              background === "card" ? "white" : "rgb(39, 39, 42)",
          }}
        >
          Price: Low to High
        </option>
        <option
          value="hl"
          style={{
            backgroundColor:
              /* istanbul ignore next */
              background === "card" ? "white" : "rgb(39, 39, 42)",
          }}
        >
          Price: High to Low
        </option>
      </Select>
    </Flex>
  );
};

export default SortSelect;
