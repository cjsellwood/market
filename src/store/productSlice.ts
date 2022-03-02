import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  product_id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  listed: Date;
  location: string;
  category?: string;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
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
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandom.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRandom.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.error = null;
          state.products = action.payload;
        }
      )
      .addCase(getRandom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.error = null;
          state.product = action.payload;
        }
      )
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
