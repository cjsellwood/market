import {
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUser } from "../store/authSlice";
import CustomInput from "./CustomInput";
import useInput from "../hooks/useInput";

const Register = () => {
  const dispatch = useAppDispatch();

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const emailValid = email.isValid();
    const usernameValid = username.isValid();
    const passwordValid = password.isValid();
    const confirmPasswordValid = confirmPassword.isValid();
    if (
      !emailValid ||
      !usernameValid ||
      !passwordValid ||
      !confirmPasswordValid
    ) {
      return;
    }

    dispatch(
      registerUser({
        email: email.value,
        username: username.value,
        password: password.value,
      })
    );
  };

  const email = useInput("", "email", "Email", {
    isRequired: true,
    minLength: 5,
    type: "email",
  });

  const username = useInput("", "username", "Username", {
    isRequired: true,
    minLength: 4,
    maxLength: 32,
  });

  const password = useInput(
    "",
    "password",
    "Password",
    {
      isRequired: true,
      minLength: 8,
      maxLength: 64,
    },
    "password"
  );

  const confirmPassword = useInput(
    "",
    "confirmPassword",
    "Confirm Password",
    {
      isRequired: true,
      minLength: 8,
      maxLength: 64,
      type: "equal",
      reference: password.value,
      referenceName: password.label,
    },
    "password"
  );

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
        <CustomInput
          value={email.value}
          id={email.id}
          label={email.label}
          error={email.error}
          isRequired={email.isRequired}
          type={email.type}
          onChange={email.onChange}
        />
        <CustomInput
          value={username.value}
          id={username.id}
          label={username.label}
          error={username.error}
          isRequired={username.isRequired}
          onChange={username.onChange}
        />
        <CustomInput
          value={password.value}
          id={password.id}
          label={password.label}
          error={password.error}
          isRequired={password.isRequired}
          type={password.type}
          onChange={password.onChange}
        />
        <CustomInput
          value={confirmPassword.value}
          id={confirmPassword.id}
          label={confirmPassword.label}
          error={confirmPassword.error}
          isRequired={confirmPassword.isRequired}
          type={confirmPassword.type}
          onChange={confirmPassword.onChange}
        />
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
