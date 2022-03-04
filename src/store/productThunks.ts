import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateError = async (res: Response) => {
  try {
    const data = await res.json();
    throw new Error(data.error);
  } catch (error) {
    const newError = error as Error;

    // Return error message from server
    if (newError.message !== "res.json is not a function") {
      throw new Error(newError.message);
    }

    // Return general error
    throw new Error("Connection error");
  }
};

export const getRandom = createAsyncThunk(
  "products/random",
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/products/random", {
        method: "GET",
        mode: "cors",
      });

      // If an error return error message
      if (res.status !== 200) {
        throw new Error(await generateError(res));
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/product",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "GET",
        mode: "cors",
      });

      // If an error return error message
      if (res.status !== 200) {
        throw new Error(await generateError(res));
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);

export const getAll = createAsyncThunk(
  "products/all",
  async (query: { page: number; count?: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/products?page=${query.page}${
          query.count ? `&count=${query.count}` : ""
        }`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      // If an error return error message
      if (res.status !== 200) {
        throw new Error(await generateError(res));
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);
