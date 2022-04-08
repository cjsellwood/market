import { Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { FormEvent, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/authSlice";
import CustomInput from "../Parts/CustomInput";
import useInput from "../../hooks/useInput";
import useAppSelector from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    email.setError("");
    username.setError("");

    // Check if inputs are valid
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

    const register = await dispatch(
      registerUser({
        email: email.value,
        username: username.value,
        password: password.value,
      })
    );

    if (register.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  const { loading, error } = useAppSelector((state) => state.auth);

  // Set input errors to custom errors received from server
  useEffect(() => {
    if (error === "username already exists") {
      username.setError("Username already exists");
    } else if (error === "email already exists") {
      email.setError("Email already exists");
    } else if (error === '"email" must be a valid email') {
      email.setError("Email is invalid");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const buttonBackgroundColor = useColorModeValue("success", "transparent");
  const buttonTextColor = useColorModeValue("white", "success");

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading color="secondary" p="4" fontSize="26px" fontWeight="500">
        REGISTER
      </Heading>
      <Flex
        as="form"
        gap="3"
        direction="column"
        w="100%"
        paddingX="4"
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
          <Button
            variant="submit-button"
            type="submit"
            isLoading={loading}
            bg={buttonBackgroundColor}
            color={buttonTextColor}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
