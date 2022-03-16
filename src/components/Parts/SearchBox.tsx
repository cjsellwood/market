import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Box, Input, IconButton, Select } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../categories";

const SearchBox = ({
  initialSearch,
  initialCategory,
}: {
  initialSearch?: string;
  initialCategory?: string;
}) => {
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [category_id, setCategory_id] = useState(initialCategory || "0");
  const navigate = useNavigate();

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    if (searchInput === "") {
      return;
    }

    navigate(
      `/search?q=${searchInput}${
        category_id !== "0" ? `&category=${category_id}` : ""
      }`
    );
  };

  useEffect(() => {
    if (!initialSearch) {
      setSearchInput("");
    }
  }, [initialSearch]);

  return (
    <Flex as="form" onSubmit={submitForm} m="1" bg="white" borderRadius="4">
      <Box w="100%">
        <Flex>
          <Input
            id="search"
            type="search"
            aria-label="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IconButton
            type="submit"
            aria-label="submit search"
            icon={<SearchIcon />}
            colorScheme="blue"
          />
        </Flex>
        <Select
          name="category"
          aria-label="select category"
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="0">All Categories</option>
          {categories.map((category, i) => {
            return (
              <option value={i + 1} key={category}>
                {category}
              </option>
            );
          })}
        </Select>
      </Box>
    </Flex>
  );
};

export default SearchBox;
