import { Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import useInput from "../../hooks/useInput";
import { loginUser } from "../../store/authSlice";
import CustomInput from "../Parts/CustomInput";

const Login = () => {
  const email = useInput("", "email", "Email", {
    isRequired: true,
    minLength: 5,
    type: "email",
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    const emailValid = email.isValid();
    const passwordValid = password.isValid();

    if (!emailValid || !passwordValid) {
      return;
    }

    const login = await dispatch(
      loginUser({ email: email.value, password: password.value })
    );

    if (login.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  const { loading, error } = useAppSelector((state) => state.auth);

  const toast = useToast();
  const toastId = "login-toast";
  // Set input errors to custom errors received from server
  useEffect(() => {
    if (
      error === "Incorrect username or password" &&
      !toast.isActive(toastId)
    ) {
      toast({
        id: toastId,
        title: "Incorrect username or password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else if (error === '"email" must be a valid email') {
      email.setError("Email is invalid");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>Login</Heading>
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
          value={password.value}
          id={password.id}
          label={password.label}
          error={password.error}
          isRequired={password.isRequired}
          type={password.type}
          onChange={password.onChange}
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

export default Login;
