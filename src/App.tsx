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
import { useEffect } from "react";
import useAppDispatch from "./hooks/useAppDispatch";
import { loadStoredUser } from "./store/authSlice";
import RedirectLogin from "./components/Navigation/RedirectLogin";
import UserProducts from "./components/Pages/UserProducts";
import useAppSelector from "./hooks/useAppSelector";

const App = () => {
  const dispatch = useAppDispatch();
  const { storageLoaded } = useAppSelector((state) => state.auth);

  // Load a previously logged in user
  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch]);
  if (!storageLoaded) {
    return null;
  }
  return (
    <Box bg="gray.100" minW="100%" minH="100vh">
      <ScrollToTop />
      <Navbar />
      <Box paddingTop="56px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Searched />} />
          <Route
            path="/new"
            element={
              <RedirectLogin>
                <NewProduct />
              </RedirectLogin>
            }
          />
          <Route
            path="/products/yours"
            element={
              <RedirectLogin>
                <UserProducts />
              </RedirectLogin>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <RedirectLogin>
                <EditProduct />
              </RedirectLogin>
            }
          />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/:category" element={<Category />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
