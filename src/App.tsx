import { Box, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Box bg="gray.100" minW="100vw" minH="100vh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
};

export default App;
