import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUser } from "../store/authSlice";
import CustomInput from "./CustomInput";
import useInput from "../hooks/useInput";

const Register = () => {
  const dispatch = useAppDispatch();

  const validateInput = () => {
    const newErrors: InputTypes = {};
    type KeyType = keyof InputTypes;

    for (let k of Object.keys(inputs)) {
      const key = k as KeyType;

      // Check if passwords match
      if (validation[key].type === "equal") {
        if (inputs[key] !== inputs[validation[key].ref as KeyType]) {
          newErrors[key] = `Does not match ${
            labels[validation[key].ref as KeyType]
          }`;
        }
      }

      // Check for valid email
      if (validation[key].type === "email") {
        if (!inputs[key]!.includes("@") || !inputs[key]!.includes(".")) {
          newErrors[key] = "Invalid email";
        }
      }

      // Check if input has its minLength
      if (validation[key].minLength) {
        if (inputs[key]!.length < validation[key].minLength!) {
          newErrors[key] = `Minimum length is ${validation[key].minLength}`;
        }
      }

      // Check if input exceed its maxLength
      if (validation[key].maxLength) {
        if (inputs[key]!.length > validation[key].maxLength!) {
          newErrors[key] = `Maximum length is ${validation[key].maxLength}`;
        }
      }

      // Check if input is required
      if (validation[key].isRequired && inputs[key] === "") {
        newErrors[key] = `${labels[key]} is required`;
      }
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validateInput();
    const testValid = test.isValid();
    const test2Valid = test2.isValid();
    if (!isValid || !testValid || !test2Valid) {
      return;
    }
    console.log("Submit");
    dispatch(
      registerUser({
        email: inputs.email as string,
        username: inputs.username as string,
        password: inputs.password as string,
      })
    );
  };

  interface InputTypes {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }

  const [inputs, setInput] = useState<InputTypes>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [labels, setLabels] = useState<InputTypes>({
    email: "Email",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
  });

  const [errors, setErrors] = useState<InputTypes>({});

  interface ValidationOptions {
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    type?: string;
    ref?: string;
  }

  interface InputValidation {
    email: ValidationOptions;
    username: ValidationOptions;
    password: ValidationOptions;
    confirmPassword: ValidationOptions;
  }
  const [validation, setValidation] = useState<InputValidation>({
    email: {
      isRequired: true,
      minLength: 5,
      type: "equal",
    },
    username: {
      isRequired: true,
      minLength: 4,
      maxLength: 32,
    },
    password: {
      isRequired: true,
      minLength: 8,
      maxLength: 64,
    },
    confirmPassword: {
      isRequired: true,
      minLength: 8,
      maxLength: 64,
      type: "equal",
      ref: "password",
    },
  });

  const test = useInput("", "test", "Test", {
    isRequired: true,
    minLength: 4,
    maxLength: 32,
  });

  const test2 = useInput("", "test2", "Test2", {
    isRequired: true,
    minLength: 4,
    maxLength: 32,
    type: "equal",
    referenceName: test.label,
    reference: test.value,
  });

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>Register</Heading>
      <Flex
        as="form"
        gap="3"
        direction="column"
        w="100%"
        p="4"
        onSubmit={submitForm}
      >
        {/* {form.map((input) => (
          <CustomInput
            key={input.id}
            label={input.label}
            id={input.id}
            initialValue={input.initialValue}
          />
        ))} */}
        <Flex direction="column">
          <FormControl isInvalid={test.error !== ""}>
            <FormLabel htmlFor={test.id} marginBottom="1">
              {test.label}{" "}
              {test.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id={test.id}
              value={test.value}
              onChange={test.onChange}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {test.error}
            </Text>
          </FormControl>
        </Flex>

        <Flex direction="column">
          <FormControl isInvalid={test2.error !== ""}>
            <FormLabel htmlFor={test2.id} marginBottom="1">
              {test2.label}{" "}
              {test2.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id={test2.id}
              value={test2.value}
              onChange={test2.onChange}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {test2.error}
            </Text>
          </FormControl>
        </Flex>

        <Flex direction="column">
          <FormControl isInvalid={errors.email !== undefined}>
            <FormLabel htmlFor="email" marginBottom="1">
              Email{" "}
              {validation.email.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id="email"
              value={inputs.email}
              onChange={(e) => {
                setInput({ ...inputs, [e.target.id]: e.target.value });
                setErrors({});
              }}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {errors.email ? errors.email : ""}
            </Text>
          </FormControl>
        </Flex>
        <Flex direction="column">
          <FormControl isInvalid={errors.username !== undefined}>
            <FormLabel htmlFor="username" marginBottom="1">
              Username{" "}
              {validation.username.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id="username"
              value={inputs.username}
              onChange={(e) => {
                setInput({ ...inputs, [e.target.id]: e.target.value });
                setErrors({});
              }}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {errors.username ? errors.username : ""}
            </Text>
          </FormControl>
        </Flex>
        <Flex direction="column">
          <FormControl isInvalid={errors.password !== undefined}>
            <FormLabel htmlFor="password" marginBottom="1">
              Password{" "}
              {validation.password.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={inputs.password}
              onChange={(e) => {
                setInput({ ...inputs, [e.target.id]: e.target.value });
                setErrors({});
              }}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {errors.password ? errors.password : ""}
            </Text>
          </FormControl>
        </Flex>
        <Flex direction="column">
          <FormControl isInvalid={errors.confirmPassword !== undefined}>
            <FormLabel htmlFor="confirmPassword" marginBottom="1">
              Confirm Password{" "}
              {validation.confirmPassword.isRequired && (
                <Text as="span" color="red">
                  *
                </Text>
              )}
            </FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInput({ ...inputs, [e.target.id]: e.target.value });
                setErrors({});
              }}
            />
            <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
              {errors.confirmPassword ? errors.confirmPassword : ""}
            </Text>
          </FormControl>
        </Flex>
        <Flex justify="center">
          <Button colorScheme="green" type="submit">
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
