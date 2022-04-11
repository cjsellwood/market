import {
  Flex,
  Heading,
  Button,
  Select,
  FormLabel,
  Box,
  Text,
  useToast,
  Input,
  ButtonGroup,
  Image,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useInput from "../../hooks/useInput";
import CustomInput from "../Parts/CustomInput";
import { categories } from "../../categories";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getProduct, updateProduct } from "../../store/productThunks";
import { useNavigate, useParams } from "react-router-dom";
import { setError } from "../../store/productSlice";

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);
  const { loading, error, reloadError, product } = useAppSelector(
    (state) => state.product
  );

  const { id } = useParams();

  // Get information on product to edit
  useEffect(() => {
    if (!product || product.product_id !== Number(id)) {
      dispatch(getProduct(Number(id)));
    }
  }, [dispatch, product, id]);

  const [category_id, setCategory_id] = useState("0");
  const [categoryError, setCategoryError] = useState("");

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

  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [updatedImages, setUpdatedImages] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [imageShown, setImageShown] = useState(0);

  const navigate = useNavigate();

  // Set inputs to products data
  useEffect(() => {
    if (product && product.product_id === Number(id)) {
      // If not the author of product return to product page
      if (product.user_id !== userId) {
        dispatch(setError("That is not your product"));
        navigate(`/products/${product.product_id}`, { replace: true });
      } else {
        const category_id =
          1 + categories.findIndex((el) => el === product.category);
        setCategory_id(category_id.toString());

        title.setValue(product.title);
        description.setValue(product.description);
        price.setValue(product.price.toString());
        location.setValue(product.location);

        setImages([
          product.images![0] || null,
          product.images![1] || null,
          product.images![2] || null,
        ]);
        setUpdatedImages([
          product.images![0] || "",
          product.images![1] || "",
          product.images![2] || "",
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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

    // Get images that have been uploaded
    const formData = new FormData();
    const fileInputs = document.querySelectorAll("input[type='file']");
    for (let i = 0; i < fileInputs.length; i++) {
      if ((fileInputs[i] as HTMLInputElement).files![0]) {
        formData.append(
          "images",
          (fileInputs[i] as HTMLInputElement).files![0]
        );
      }
    }
    formData.append("title", title.value);
    formData.append("category_id", category_id);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("location", location.value);
    formData.append("updatedImages", JSON.stringify(updatedImages));

    const res = await dispatch(
      updateProduct({ form: formData, product_id: id! })
    );

    // Navigate to the new products page
    const product_id = res.payload.product_id;
    if (product_id) {
      navigate(`/products/${product_id}`);
    }
  };

  // Show any errors
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [error, toast, reloadError]);

  // Set image for previews on page
  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    // Exit if not files
    if (!e.target.files) {
      dispatch(setError("Image not selected"));
      return;
    }
    const index = Number(e.target.name.split(" ")[1]) - 1;

    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];

    // Exit if not an image
    if (!fileTypes.includes(e.target.files[0].type)) {
      const fileInputs = document.querySelectorAll("input[type='file']");
      (fileInputs[index] as HTMLInputElement).files = null;
      dispatch(setError("Not an image"));
      return;
    }

    const newImages = [...images];

    // Save image url to preview image
    newImages[index] = URL.createObjectURL(e.target.files[0]);
    setImages(newImages);

    const newUpdatedImages = [...updatedImages];
    if (!updatedImages[index]!.startsWith("!")) {
      newUpdatedImages[index] = "!" + updatedImages[index];
      setUpdatedImages(newUpdatedImages);
    }
  };

  const removeFile = (i: number) => {
    const newImages = [...images];
    newImages[i] = null;
    setImages(newImages);
    const newUpdatedImages = [...updatedImages];

    if (updatedImages[i] && !updatedImages[i]!.startsWith("!")) {
      newUpdatedImages[i] = "!" + updatedImages[i];
      setUpdatedImages(newUpdatedImages);
    }
    const fileInputs = document.querySelectorAll("input[type='file']");
    (fileInputs[i] as HTMLInputElement).files = null;
    (fileInputs[i] as HTMLInputElement).value = "";
  };

  const selectBackground = useColorModeValue("card", "cardDark");
  const selectBorderColor = useColorModeValue("#b0b0b0", "#4a4a4a");

  const fileButtonTextColor = useColorModeValue("#000", "#fff");

  const buttonBackgroundColor = useColorModeValue("success", "transparent");
  const buttonTextColor = useColorModeValue("white", "success");
  const buttonHoverColor = useColorModeValue("#076913", "#8787873b");
  const buttonHoverBorder = useColorModeValue("#076913", "success");

  if (!product && loading) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center">
      <Flex
        maxWidth="860px"
        direction="column"
        p={{ base: "0.5", lg: "4" }}
        width="100%"
      >
        <Heading
          color="secondary"
          p="4"
          fontSize="26px"
          fontWeight="500"
          textAlign="center"
        >
          EDIT PRODUCT
        </Heading>
        <Flex direction="column" justifyContent="center" marginX="-0.5">
          <Flex
            justifyContent="center"
            bg="rgb(10, 10, 10)"
            width="100%"
            height="0"
            overflow="hidden"
            paddingTop="100%"
            position="relative"
          >
            {images.map((image, i) => {
              if (image !== null) {
                return (
                  <Image
                    src={image}
                    display={imageShown === i ? "block" : "none"}
                    objectFit="contain"
                    alt={`Image ${i + 1}`}
                    key={`Image ${i + 1}`}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                  />
                );
              } else {
                return (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    display={imageShown === i ? "flex" : "none"}
                    key={`Image ${i + 1}`}
                  >
                    <Text color="white">No Image</Text>
                  </Flex>
                );
              }
            })}
          </Flex>
          <ButtonGroup justifyContent="center" p="2">
            {images.map((image, i) => {
              return (
                <Button
                  onClick={() => setImageShown(i)}
                  aria-label={`Image ${i + 1}`}
                  key={`Image ${i + 1}`}
                  backgroundColor={imageShown === i ? "#e5067d" : "#060698"}
                  variant="image-button"
                  className="no-highlight"
                  _hover={{ filter: "brightness(1.5)" }}
                >
                  {i + 1}
                </Button>
              );
            })}
          </ButtonGroup>
          {images.map((image, i) => {
            return (
              <Flex justifyContent="center" key={`File ${i + 1}`}>
                <Flex
                  display={imageShown === i ? "flex" : "none"}
                  justifyContent="space-evenly"
                  p="1"
                  paddingX="8"
                  width="100%"
                  maxWidth="600px"
                >
                  <Button
                    as="label"
                    htmlFor={`File ${i + 1}`}
                    variant="neutral-button"
                    color={fileButtonTextColor}
                    borderColor={selectBorderColor}
                    w="50%"
                    maxWidth="200px"
                    cursor={"pointer"}
                    _focus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6);" }}
                    _hover={{
                      backgroundColor: "#8787873b",
                    }}
                  >
                    {image ? "Change" : "Add"}
                  </Button>
                  <Input
                    type="file"
                    id={`File ${i + 1}`}
                    name={`File ${i + 1}`}
                    aria-label="upload image"
                    hidden
                    onChange={setFile}
                  />
                  <Button
                    onClick={() => removeFile(i)}
                    aria-label="remove image"
                    variant="neutral-button"
                    color={fileButtonTextColor}
                    borderColor={selectBorderColor}
                    w="50%"
                    maxWidth="200px"
                    _hover={{
                      backgroundColor: "#8787873b",
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex justifyContent="center">
          <Flex
            as="form"
            gap="3"
            direction="column"
            w="100%"
            maxWidth="600px"
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
                fontSize="sm"
                borderColor={selectBorderColor}
                cursor="pointer"
              >
                <option
                  value="0"
                  hidden
                  style={{
                    backgroundColor:
                      /* istanbul ignore next */
                      selectBackground === "card" ? "white" : "rgb(22, 27, 34)",
                  }}
                >
                  Select a category
                </option>
                {categories.map((category, i) => {
                  return (
                    <option
                      value={i + 1}
                      key={category}
                      style={{
                        backgroundColor:
                          /* istanbul ignore next */
                          selectBackground === "card"
                            ? "white"
                            : "rgb(22, 27, 34)",
                      }}
                    >
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
              <Button
                variant="submit-button"
                type="submit"
                isLoading={loading}
                bg={buttonBackgroundColor}
                color={buttonTextColor}
                _hover={{
                  bg: buttonHoverColor,
                  borderColor: buttonHoverBorder,
                }}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default EditProduct;
