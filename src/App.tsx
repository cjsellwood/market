import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Navbar from "./components/Navigation/NavBar";
import Product from "./components/Pages/Product";
import ScrollToTop from "./components/Navigation/ScrollToTop";
import Products from "./components/Pages/Products";
import Category from "./components/Pages/Category";
import Searched from "./components/Pages/Searched";
import NewProduct from "./components/Pages/NewProduct";
import EditProduct from "./components/Pages/EditProduct";

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
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Searched />} />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/:category" element={<Category />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
