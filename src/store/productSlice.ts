import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandom, getProduct, getAll } from "./productThunks";

export interface Product {
  product_id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  images: string[] | string;
  listed: Date;
  location: string;
  category?: string;
}

interface ProductState {
  products: Product[];
  count: string;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  count: "0",
  product: null,
  loading: false,
  error: null,
};

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
      })
      .addCase(getAll.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAll.fulfilled,
        (
          state,
          action: PayloadAction<{ count: string; products: Product[] }>
        ) => {
          state.loading = false;
          state.error = null;
          state.products = action.payload.products;
          state.count = action.payload.count;
        }
      )
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
