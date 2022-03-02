import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactElement } from "react";
import { RootState } from "../store/store";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import authReducer from "../store/authSlice";
import productReducer from "../store/productSlice";

export const renderer = (
  element: ReactElement,
  preloadedState: RootState | {} = {}
) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      product: productReducer,
    },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter> {element}</MemoryRouter>
    </Provider>
  );
};

export const randomProducts = [
  {
    product_id: 29,
    user_id: 5,
    title: "Ergonomic Frozen Towels",
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    price: 946,
    images: [
      "https://placeimg.com/500/500/tech",
      "https://placeimg.com/500/500/arch",
      "https://placeimg.com/500/500/animals",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Funkville",
    category: "Cars",
  },
  {
    product_id: 12,
    user_id: 4,
    category_id: 3,
    title: "Licensed Steel Salad",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    price: 778,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Jaskolskifort",
  },
  {
    product_id: 44,
    user_id: 3,
    category_id: 1,
    title: "Licensed Concrete Fish",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 719,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "New Montemouth",
  },
  {
    product_id: 1,
    user_id: 2,
    category_id: 1,
    title: "Refined Frozen Ball",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 699,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "West Everardo",
  },
  {
    product_id: 41,
    user_id: 3,
    category_id: 3,
    title: "Refined Frozen Ball",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    price: 68,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Funkville",
  },
  {
    product_id: 16,
    user_id: 2,
    category_id: 6,
    title: "Rustic Cotton Chair",
    description: "The Football Is Good For Training And Recreational Purposes",
    price: 358,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Elisabethland",
  },
  {
    product_id: 6,
    user_id: 6,
    category_id: 7,
    title: "Small Fresh Fish",
    description:
      "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 440,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Grand Rapids",
  },
  {
    product_id: 46,
    user_id: 2,
    category_id: 7,
    title: "Generic Rubber Shirt",
    description:
      "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 578,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Cruzshire",
  },
  {
    product_id: 32,
    user_id: 2,
    category_id: 7,
    title: "Small Frozen Tuna",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 263,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Williemouth",
  },
  {
    product_id: 11,
    user_id: 6,
    category_id: 5,
    title: "Handcrafted Cotton Towels",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 939,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Marionton",
  },
  {
    product_id: 49,
    user_id: 6,
    category_id: 2,
    title: "Generic Rubber Sausages",
    description: "The Football Is Good For Training And Recreational Purposes",
    price: 576,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Grand Rapids",
  },
  {
    product_id: 40,
    user_id: 10,
    category_id: 6,
    title: "Refined Concrete Tuna",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 549,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Murray",
  },
  {
    product_id: 35,
    user_id: 8,
    category_id: 2,
    title: "Small Rubber Shoes",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    price: 169,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Reichertland",
  },
  {
    product_id: 10,
    user_id: 3,
    category_id: 6,
    title: "Tasty Frozen Table",
    description:
      "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 423,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Port Adalberto",
  },
  {
    product_id: 25,
    user_id: 4,
    category_id: 1,
    title: "Rustic Cotton Chair",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 596,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "North Frankie",
  },
  {
    product_id: 43,
    user_id: 4,
    category_id: 7,
    title: "Small Fresh Bacon",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    price: 1008,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Cruzshire",
  },
  {
    product_id: 3,
    user_id: 7,
    category_id: 1,
    title: "Refined Fresh Shirt",
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    price: 675,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "Jaquelinview",
  },
  {
    product_id: 34,
    user_id: 9,
    category_id: 4,
    title: "Refined Concrete Tuna",
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    price: 447,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "West Estaton",
  },
  {
    product_id: 50,
    user_id: 7,
    category_id: 7,
    title: "Small Plastic Table",
    description:
      "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 817,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "West Amiya",
  },
  {
    product_id: 30,
    user_id: 10,
    category_id: 3,
    title: "Fantastic Frozen Bike",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 873,
    images: [
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
      "https://placeimg.com/500/500",
    ],
    listed: "2022-02-28T13:00:00.000Z",
    location: "East Khalilton",
  },
];
