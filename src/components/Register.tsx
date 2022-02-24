import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Register = () => {
  return (
    <Flex justify="center" align="center" direction="column">
      <Heading>Register</Heading>
      <FormControl p="4">
        <Flex gap="3" direction="column">
          <Flex direction="column">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" />
          </Flex>
          <Flex direction="column">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input id="confirmPassword" type="password" />
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
