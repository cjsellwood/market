import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

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
  async (id: number, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).auth.token;
    try {
      let res;
      if (token) {
        res = await fetch(`http://localhost:5000/products/${id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await fetch(`http://localhost:5000/products/${id}`, {
          method: "GET",
          mode: "cors",
        });
      }

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
          query.count && query.page !== 1 ? `&count=${query.count}` : ""
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

export const getCategory = createAsyncThunk(
  "products/category",
  async (
    query: { category_id: number; page: number; count?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/products/category/${query.category_id}?page=${
          query.page
        }${query.count && query.page !== 1 ? `&count=${query.count}` : ""}`,
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

export const getSearch = createAsyncThunk(
  "products/search",
  async (
    query: { q: string; page: number; count?: string; category_id?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/products/search?q=${query.q}&page=${query.page}${
          query.count && query.page !== 1 ? `&count=${query.count}` : ""
        }${query.category_id ? `&category=${query.category_id}` : ""}`,
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

export const getUserProducts = createAsyncThunk(
  "products/user",
  async (
    query: { page: number; count?: string },
    { rejectWithValue, getState }
  ) => {
    const token = (getState() as RootState).auth.token;

    try {
      const res = await fetch(
        `http://localhost:5000/products/user?page=${query.page}${
          query.count && query.page !== 1 ? `&count=${query.count}` : ""
        }`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

export const newProduct = createAsyncThunk(
  "products/new",
  async (product: FormData, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).auth.token;
    try {
      const res = await fetch("http://localhost:5000/products/new", {
        method: "POST",
        mode: "cors",
        body: product,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (product_id: string, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).auth.token;

    try {
      const res = await fetch(`http://localhost:5000/products/${product_id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    product: { form: FormData; product_id: string },
    { rejectWithValue, getState }
  ) => {
    const token = (getState() as RootState).auth.token;
    try {
      const res = await fetch(
        `http://localhost:5000/products/${product.product_id}`,
        {
          method: "PUT",
          mode: "cors",
          body: product.form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

export const sendMessage = createAsyncThunk(
  "products/message",
  async (
    query: {
      text: string;
      product_id: number;
      sender: number;
      receiver: number;
    },
    { rejectWithValue, getState }
  ) => {
    const token = (getState() as RootState).auth.token;
    try {
      const res = await fetch(
        `http://localhost:5000/products/${query.product_id}`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ text: query.text, receiver: query.receiver }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
