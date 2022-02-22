import { Box, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Box bg="gray.100" minW="100vw" minH="100vh">
      <Routes>
        <Route
          path="/"
          element={
            <Text>
              This is Home -&nbsp;
              <Link to="/login">Go to Login</Link>
            </Text>
          }
        />
        <Route
          path="/login"
          element={
            <Text>
              This is Login -&nbsp;
              <Link to="/">Go to Home</Link>
            </Text>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
