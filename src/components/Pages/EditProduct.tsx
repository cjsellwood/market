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

        setImages(product.images!);
        setUpdatedImages(product.images!);
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

  if (!product && loading) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>Edit Product</Heading>
      <Flex direction="column" width="100%">
        <Flex justifyContent="center" bg="gray.300" width="100%">
          {images.map((image, i) => {
            if (image !== null) {
              return (
                <Image
                  src={image}
                  display={imageShown === i ? "block" : "none"}
                  objectFit="contain"
                  width="100%"
                  height="100vw"
                  alt={`Image ${i + 1}`}
                  key={`Image ${i + 1}`}
                />
              );
            } else {
              return (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100vw"
                  display={imageShown === i ? "flex" : "none"}
                  key={`Image ${i + 1}`}
                >
                  <Text>No Image</Text>
                </Flex>
              );
            }
          })}
        </Flex>
        {images.map((image, i) => {
          return (
            <Flex
              justifyContent="center"
              display={imageShown === i ? "flex" : "none"}
              key={`File ${i + 1}`}
            >
              <Button colorScheme="blue" as="label" htmlFor={`File ${i + 1}`}>
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
                colorScheme="red"
                onClick={() => removeFile(i)}
                aria-label="remove image"
              >
                Remove
              </Button>
            </Flex>
          );
        })}
        <ButtonGroup justifyContent="center" colorScheme="blue" p="1" size="sm">
          {images.map((image, i) => {
            return (
              <Button
                onClick={() => setImageShown(i)}
                aria-label={`Image ${i + 1}`}
                key={`Image ${i + 1}`}
                outline={imageShown === i ? "2px solid red" : "none"}
              >
                {i + 1}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
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

export default EditProduct;
