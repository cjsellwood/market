import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRandom,
  getProduct,
  getAll,
  getCategory,
  getSearch,
  newProduct,
  deleteProduct,
  updateProduct,
  getUserProducts,
  sendMessage,
} from "./productThunks";

export interface Message {
  sender: number;
  receiver: number;
  text: string;
  time: string;
  senderName?: string;
}

export interface Product {
  product_id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  listed: Date;
  location: string;
  images?: string[];
  image?: string;
  category?: string;
  messages?: Message[];
}

interface ProductState {
  products: Product[];
  count: string;
  product: Product | null;
  loading: boolean;
  error: string | null;
  reloadError: boolean;
}

const initialState: ProductState = {
  products: [],
  count: "0",
  product: null,
  loading: false,
  error: null,
  reloadError: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.reloadError = !state.reloadError;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandom.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.products = [];
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
        state.product = null;
      })
      .addCase(getAll.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.products = [];
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
      })
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(
        getCategory.fulfilled,
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
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSearch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(
        getSearch.fulfilled,
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
      .addCase(getSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(
        getUserProducts.fulfilled,
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
      .addCase(getUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(newProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newProduct.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.error = null;
        if (state.product?.messages) {
          state.product?.messages?.push({
            sender: action.meta.arg.sender,
            receiver: action.meta.arg.receiver,
            text: action.meta.arg.text,
            time: new Date().toISOString(),
          });
        } else {
          state.product!.messages = [
            {
              sender: action.meta.arg.sender,
              receiver: action.meta.arg.receiver,
              text: action.meta.arg.text,
              time: new Date().toISOString(),
            },
          ];
        }
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string;
        state.product!.messages = state.product?.messages?.slice(
          0,
          state.product.messages.length - 1
        );
      });
  },
});

export const { setError } = productSlice.actions;

export default productSlice.reducer;
