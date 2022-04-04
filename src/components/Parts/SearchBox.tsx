import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Input,
  IconButton,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
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

  const background = useColorModeValue("card", "cardDark");
  const borderColor = useColorModeValue("#dedede", "#4d4d4d");

  return (
    <Flex
      as="form"
      onSubmit={submitForm}
      m="1"
      borderRadius="4"
      // borderWidth="1px"
      borderColor={borderColor}
      bg={background}
      // overflow="hidden"
    >
      <Box w="100%">
        <Flex>
          <Input
            id="search"
            type="search"
            aria-label="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            border="none"
            borderRadius="2"
          />
          <IconButton
            type="submit"
            aria-label="submit search"
            icon={<SearchIcon />}
            backgroundColor="secondary"
            color="white"
            border="none"
            borderRadius="0 4px 0 0"
            _active={{ bg: "secondary" }}
            _hover={{ bg: "secondary" }}
          />
        </Flex>
        <Select
          name="category"
          aria-label="select category"
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
          borderWidth="0"
          borderRadius="2"
          borderTopWidth="1px"
          borderTopColor={borderColor}
          bg={background}
        >
          <option
            value="0"
            style={{
              backgroundColor:
                /* istanbul ignore next */
                background === "card" ? "white" : "rgb(39, 39, 42)",
            }}
          >
            All Categories
          </option>
          {categories.map((category, i) => {
            return (
              <option
                value={i + 1}
                key={category}
                style={{
                  backgroundColor:
                    /* istanbul ignore next */
                    background === "card" ? "white" : "rgb(39, 39, 42)",
                }}
              >
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
