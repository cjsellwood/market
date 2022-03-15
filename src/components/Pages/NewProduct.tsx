import {
  Flex,
  Heading,
  Button,
  Select,
  FormLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useInput from "../../hooks/useInput";
import CustomInput from "../Parts/CustomInput";
import { categories } from "../../categories";

const NewProduct = () => {
  const { loading } = useAppSelector((state) => state.product);
  const [category_id, setCategory_id] = useState("0");

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    const titleValid = title.isValid();
    const descriptionValid = description.isValid();
    const categoryValid = category_id !== "0";
    const priceValid = price.isValid();
    const locationValid = location.isValid();

    if (
      !titleValid ||
      !descriptionValid ||
      !priceValid ||
      !locationValid ||
      !categoryValid
    ) {
      return;
    }
  };

  const title = useInput("", "title", "Title", {
    isRequired: true,
    minLength: 4,
  });
  const description = useInput("", "description", "Description", {
    isRequired: true,
    minLength: 4,
  });
  const price = useInput(
    "",
    "price",
    "Price",
    {
      isRequired: true,
    },
    "number"
  );
  const location = useInput("", "location", "Location", {
    isRequired: true,
    minLength: 3,
  });

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>New Product</Heading>
      <Flex
        as="form"
        gap="3"
        direction="column"
        w="100%"
        p="4"
        onSubmit={submitForm}
      >
        <CustomInput
          value={title.value}
          id={title.id}
          label={title.label}
          error={title.error}
          isRequired={title.isRequired}
          type={title.type}
          onChange={title.onChange}
        />
        <Box>
          <FormLabel>
            Category{" "}
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>

          <Select
            name="category"
            aria-label="select category"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
          >
            <option value="0" hidden>
              Select a category
            </option>
            {categories.map((category, i) => {
              return (
                <option value={i + 1} key={category}>
                  {category}
                </option>
              );
            })}
          </Select>
          <Text color="red.500" fontSize="14px" h="16px" marginTop="1"></Text>
        </Box>
        <CustomInput
          value={description.value}
          id={description.id}
          label={description.label}
          error={description.error}
          isRequired={description.isRequired}
          type={description.type}
          onChange={description.onChange}
          textArea
        />
        <CustomInput
          value={price.value}
          id={price.id}
          label={price.label}
          error={price.error}
          isRequired={price.isRequired}
          type={price.type}
          onChange={price.onChange}
        />
        <CustomInput
          value={location.value}
          id={location.id}
          label={location.label}
          error={location.error}
          isRequired={location.isRequired}
          type={location.type}
          onChange={location.onChange}
        />
        <Flex justify="center">
          <Button colorScheme="green" type="submit" isLoading={loading}>
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewProduct;
