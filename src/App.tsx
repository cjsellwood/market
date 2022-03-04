import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navigation/NavBar";
import Product from "./components/Product";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Box bg="gray.100" minW="100%" minH="200vh">
      <ScrollToTop />
      <Navbar />
      <Box paddingTop="56px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
