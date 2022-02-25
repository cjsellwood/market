import { Box, Link, Button, Heading, ButtonGroup } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Heading>This is Home</Heading>
      <ButtonGroup spacing="3">
        <Link to="/login" as={RouterLink}>
          <Button colorScheme="blue">Login</Button>
        </Link>
        <Link to="/register" as={RouterLink}>
          <Button colorScheme="blue">Register</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Home;
