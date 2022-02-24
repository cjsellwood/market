import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUser } from "../store/authSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = () => {
    dispatch(registerUser({ email, username, password }));
  };

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>Register</Heading>
      <FormControl p="4" onSubmit={submitForm}>
        <Flex gap="3" direction="column">
          <Flex direction="column">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Flex>
          <Flex justify="center">
            <Button colorScheme="green">Submit</Button>
          </Flex>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default Register;
