import {
  Flex,
  Heading,
  Button,
  Select,
  FormLabel,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useInput from "../../hooks/useInput";
import CustomInput from "../Parts/CustomInput";
import { categories } from "../../categories";
import useAppDispatch from "../../hooks/useAppDispatch";
import { newProduct } from "../../store/productThunks";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { loading, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [category_id, setCategory_id] = useState("0");
  const [categoryError, setCategoryError] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    // Check input validity
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
      if (!categoryValid) {
        setCategoryError("A category must be selected");
      }
      return;
    }

    const res = await dispatch(
      newProduct({
        title: title.value,
        category_id: category_id,
        description: description.value,
        price: price.value,
        location: location.value,
      })
    );

    // Navigate to the new products page
    const product_id = res.payload.product_id;
    if (product_id) {
      navigate(`/products/${product_id}`);
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
          <FormLabel htmlFor="category">
            Category{" "}
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>
          <Select
            name="category"
            id="category"
            aria-label="select category"
            value={category_id}
            onChange={(e) => {
              setCategory_id(e.target.value);
              setCategoryError("");
            }}
            isInvalid={categoryError !== ""}
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
          <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
            {categoryError}
          </Text>
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
