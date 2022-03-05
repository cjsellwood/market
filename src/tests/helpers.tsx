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

export const allProducts = {
  products: [
    {
      product_id: 23,
      title: "Refined Cotton Ball",
      description:
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      price: 609,
      image: "https://placeimg.com/500/500/tech",
      location: "Tryciastad",
      listed: "2022-02-28T13:00:00.000Z",
    },
    {
      product_id: 21,
      title: "Refined Fresh Shirt",
      description:
        "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      price: 355,
      image: "https://placeimg.com/500/500/arch",
      location: "Elisabethland",
      listed: "2022-02-27T13:00:00.000Z",
    },
    {
      product_id: 32,
      title: "Ergonomic Soft Towels",
      description:
        "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      price: 991,
      image: "https://placeimg.com/500/500/people",
      location: "White Plains",
      listed: "2022-02-26T13:00:00.000Z",
    },
    {
      product_id: 3,
      title: "Tasty Frozen Table",
      description:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      price: 540,
      image: "https://placeimg.com/500/500/tech",
      location: "Kissimmee",
      listed: "2022-02-26T13:00:00.000Z",
    },
    {
      product_id: 27,
      title: "Fantastic Frozen Soap",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 136,
      image: "https://placeimg.com/500/500/arch",
      location: "State College",
      listed: "2022-02-23T13:00:00.000Z",
    },
    {
      product_id: 45,
      title: "Licensed Granite Cheese",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 511,
      image: "https://placeimg.com/500/500/nature",
      location: "Funkville",
      listed: "2022-02-22T13:00:00.000Z",
    },
    {
      product_id: 13,
      title: "Small Frozen Tuna",
      description:
        "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      price: 395,
      image: "https://placeimg.com/500/500/arch",
      location: "North Nona",
      listed: "2022-02-21T13:00:00.000Z",
    },
    {
      product_id: 5,
      title: "Ergonomic Frozen Towels",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 685,
      image: "https://placeimg.com/500/500/animals",
      location: "West Janetborough",
      listed: "2022-02-21T13:00:00.000Z",
    },
    {
      product_id: 16,
      title: "Rustic Wooden Pizza",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 520,
      image: "https://placeimg.com/500/500/people",
      location: "Venamouth",
      listed: "2022-02-20T13:00:00.000Z",
    },
    {
      product_id: 19,
      title: "Small Fresh Bacon",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 851,
      image: "https://placeimg.com/500/500/people",
      location: "New Kyle",
      listed: "2022-02-19T13:00:00.000Z",
    },
    {
      product_id: 48,
      title: "Unbranded Wooden Keyboard",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 731,
      image: "https://placeimg.com/500/500/people",
      location: "Lake Anthony",
      listed: "2022-02-18T13:00:00.000Z",
    },
    {
      product_id: 15,
      title: "Fantastic Wooden Sausages",
      description:
        "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      price: 760,
      image: "https://placeimg.com/500/500/people",
      location: "Reichertland",
      listed: "2022-02-14T13:00:00.000Z",
    },
    {
      product_id: 37,
      title: "Small Fresh Fish",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 765,
      image: "https://placeimg.com/500/500/tech",
      location: "Port Salvador",
      listed: "2022-02-14T13:00:00.000Z",
    },
    {
      product_id: 33,
      title: "Awesome Fresh Chair",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 171,
      image: "https://placeimg.com/500/500/tech",
      location: "North Antonetta",
      listed: "2022-02-12T13:00:00.000Z",
    },
    {
      product_id: 50,
      title: "Practical Rubber Fish",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 243,
      image: "https://placeimg.com/500/500/arch",
      location: "Lake Cesar",
      listed: "2022-02-11T13:00:00.000Z",
    },
    {
      product_id: 38,
      title: "Tasty Concrete Keyboard",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 919,
      image: "https://placeimg.com/500/500/people",
      location: "Lake Adell",
      listed: "2022-02-11T13:00:00.000Z",
    },
    {
      product_id: 11,
      title: "Handcrafted Wooden Fish",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 878,
      image: "https://placeimg.com/500/500/arch",
      location: "Lake Ludie",
      listed: "2022-02-08T13:00:00.000Z",
    },
    {
      product_id: 7,
      title: "Rustic Steel Sausages",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 43,
      image: "https://placeimg.com/500/500/animals",
      location: "Lake Ludie",
      listed: "2022-02-07T13:00:00.000Z",
    },
    {
      product_id: 24,
      title: "Fantastic Fresh Sausages",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 616,
      image: "https://placeimg.com/500/500/tech",
      location: "Port Ricky",
      listed: "2022-02-07T13:00:00.000Z",
    },
    {
      product_id: 2,
      title: "Small Rubber Shoes",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 533,
      image: "https://placeimg.com/500/500/tech",
      location: "New Solonmouth",
      listed: "2022-02-07T13:00:00.000Z",
    },
  ],
  count: "50",
};

export const allProductsPage3 = {
  products: [
    {
      product_id: 14,
      title: "Practical Rubber Fish",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 695,
      image: "https://placeimg.com/500/500/people",
      location: "West Lucy",
      listed: "2022-01-14T13:00:00.000Z",
    },
    {
      product_id: 22,
      title: "Practical Granite Keyboard",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 675,
      image: "https://placeimg.com/500/500/nature",
      location: "North Kaleighshire",
      listed: "2022-01-14T13:00:00.000Z",
    },
    {
      product_id: 41,
      title: "Intelligent Concrete Chips",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 309,
      image: "https://placeimg.com/500/500/arch",
      location: "Maxwellport",
      listed: "2022-01-10T13:00:00.000Z",
    },
    {
      product_id: 46,
      title: "Small Fresh Bacon",
      description:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      price: 56,
      image: "https://placeimg.com/500/500/nature",
      location: "Kissimmee",
      listed: "2022-01-07T13:00:00.000Z",
    },
    {
      product_id: 28,
      title: "Small Fresh Fish",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 186,
      image: "https://placeimg.com/500/500/nature",
      location: "New Montemouth",
      listed: "2022-01-06T13:00:00.000Z",
    },
    {
      product_id: 26,
      title: "Licensed Metal Chips",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 606,
      image: "https://placeimg.com/500/500/tech",
      location: "West Simone",
      listed: "2022-01-06T13:00:00.000Z",
    },
    {
      product_id: 49,
      title: "Refined Fresh Shirt",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 963,
      image: "https://placeimg.com/500/500/nature",
      location: "Jaquelinview",
      listed: "2022-01-03T13:00:00.000Z",
    },
    {
      product_id: 35,
      title: "Handcrafted Rubber Bike",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 992,
      image: "https://placeimg.com/500/500/arch",
      location: "East Khalilton",
      listed: "2022-01-03T13:00:00.000Z",
    },
    {
      product_id: 8,
      title: "Generic Rubber Sausages",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 389,
      image: "https://placeimg.com/500/500/people",
      location: "Willbury",
      listed: "2022-01-03T13:00:00.000Z",
    },
    {
      product_id: 40,
      title: "Unbranded Cotton Hat",
      description:
        "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      price: 250,
      image: "https://placeimg.com/500/500/animals",
      location: "Maxwellport",
      listed: "2022-01-01T13:00:00.000Z",
    },
  ],
  count: "50",
};

export const category1Products = {
  products: [
    {
      product_id: 19,
      title: "Handcrafted Wooden Fish",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 496,
      image: "https://placeimg.com/500/500/people",
      location: "South Ahmedfort",
      listed: "2022-02-25T13:00:00.000Z",
    },
    {
      product_id: 47,
      title: "Fantastic Plastic Salad",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 945,
      image: "https://placeimg.com/500/500/animals",
      location: "Langborough",
      listed: "2022-02-24T13:00:00.000Z",
    },
    {
      product_id: 12,
      title: "Small Rubber Shoes",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 510,
      image: "https://placeimg.com/500/500/tech",
      location: "Connfurt",
      listed: "2022-02-23T13:00:00.000Z",
    },
    {
      product_id: 49,
      title: "Intelligent Plastic Gloves",
      description:
        "The Football Is Good For Training And Recreational Purposes",
      price: 20,
      image: "https://placeimg.com/500/500/animals",
      location: "White Plains",
      listed: "2022-02-20T13:00:00.000Z",
    },
    {
      product_id: 34,
      title: "Awesome Cotton Pizza",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 904,
      image: "https://placeimg.com/500/500/nature",
      location: "New Garlandfort",
      listed: "2022-02-17T13:00:00.000Z",
    },
    {
      product_id: 48,
      title: "Rustic Cotton Ball",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 913,
      image: "https://placeimg.com/500/500/people",
      location: "East Filibertofurt",
      listed: "2022-01-21T13:00:00.000Z",
    },
    {
      product_id: 40,
      title: "Rustic Concrete Bike",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 712,
      image: "https://placeimg.com/500/500/animals",
      location: "Tallahassee",
      listed: "2022-01-20T13:00:00.000Z",
    },
    {
      product_id: 15,
      title: "Fantastic Wooden Sausages",
      description:
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      price: 367,
      image: "https://placeimg.com/500/500/animals",
      location: "North Celia",
      listed: "2022-01-10T13:00:00.000Z",
    },
  ],
  count: "8",
};

export const searchProducts = {
  products: [
    {
      product_id: 32,
      title: "Sleek Plastic Chips",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 695,
      image: "https://placeimg.com/500/500/arch",
      location: "Rettaland",
      listed: "2022-02-27T13:00:00.000Z",
    },
    {
      product_id: 33,
      title: "Unbranded Plastic Towels",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 392,
      image: "https://placeimg.com/500/500/arch",
      location: "Farmington",
      listed: "2022-02-27T13:00:00.000Z",
    },
    {
      product_id: 13,
      title: "Licensed Concrete Fish",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 822,
      image: "https://placeimg.com/500/500/nature",
      location: "Padbergmouth",
      listed: "2022-02-25T13:00:00.000Z",
    },
    {
      product_id: 30,
      title: "Practical Rubber Fish",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 719,
      image: "https://placeimg.com/500/500/arch",
      location: "New Kyle",
      listed: "2022-02-25T13:00:00.000Z",
    },
    {
      product_id: 49,
      title: "Incredible Fresh Bike",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 655,
      image: "https://placeimg.com/500/500/tech",
      location: "Marionton",
      listed: "2022-02-23T13:00:00.000Z",
    },
    {
      product_id: 42,
      title: "Rustic Granite Fish",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 408,
      image: "https://placeimg.com/500/500/tech",
      location: "Cruzshire",
      listed: "2022-02-22T13:00:00.000Z",
    },
    {
      product_id: 34,
      title: "Rustic Concrete Bike",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 292,
      image: "https://placeimg.com/500/500/tech",
      location: "South Darienbury",
      listed: "2022-02-19T13:00:00.000Z",
    },
    {
      product_id: 15,
      title: "Gorgeous Fresh Shoes",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 331,
      image: "https://placeimg.com/500/500/nature",
      location: "Tryciastad",
      listed: "2022-02-18T13:00:00.000Z",
    },
    {
      product_id: 21,
      title: "Gorgeous Metal Pants",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 470,
      image: "https://placeimg.com/500/500/people",
      location: "State College",
      listed: "2022-02-18T13:00:00.000Z",
    },
    {
      product_id: 1,
      title: "Intelligent Metal Computer",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 989,
      image: "https://placeimg.com/500/500/arch",
      location: "South Verdieton",
      listed: "2022-02-15T13:00:00.000Z",
    },
    {
      product_id: 6,
      title: "Generic Wooden Ball",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 265,
      image: "https://placeimg.com/500/500/animals",
      location: "North Sigmund",
      listed: "2022-02-15T13:00:00.000Z",
    },
    {
      product_id: 50,
      title: "Gorgeous Metal Pants",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 650,
      image: "https://placeimg.com/500/500/animals",
      location: "Jaquelinview",
      listed: "2022-02-15T13:00:00.000Z",
    },
    {
      product_id: 20,
      title: "Rustic Concrete Chips",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 873,
      image: "https://placeimg.com/500/500/arch",
      location: "Glen Burnie",
      listed: "2022-02-13T13:00:00.000Z",
    },
    {
      product_id: 17,
      title: "Small Rubber Shoes",
      description:
        "The Football Is Good For Training And Recreational Purposes",
      price: 348,
      image: "https://placeimg.com/500/500/people",
      location: "Maxwellport",
      listed: "2022-02-10T13:00:00.000Z",
    },
    {
      product_id: 26,
      title: "Awesome Cotton Pizza",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 714,
      image: "https://placeimg.com/500/500/arch",
      location: "Rogers",
      listed: "2022-02-09T13:00:00.000Z",
    },
    {
      product_id: 45,
      title: "Small Concrete Shoes",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 553,
      image: "https://placeimg.com/500/500/arch",
      location: "Elisabethland",
      listed: "2022-02-07T13:00:00.000Z",
    },
    {
      product_id: 3,
      title: "Sleek Wooden Bacon",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 60,
      image: "https://placeimg.com/500/500/animals",
      location: "Connfurt",
      listed: "2022-02-06T13:00:00.000Z",
    },
    {
      product_id: 19,
      title: "Awesome Metal Pants",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 479,
      image: "https://placeimg.com/500/500/nature",
      location: "East Khalilton",
      listed: "2022-02-05T13:00:00.000Z",
    },
    {
      product_id: 38,
      title: "Practical Granite Keyboard",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 736,
      image: "https://placeimg.com/500/500/people",
      location: "Tryciastad",
      listed: "2022-02-04T13:00:00.000Z",
    },
    {
      product_id: 8,
      title: "Generic Rubber Sausages",
      description:
        "The Football Is Good For Training And Recreational Purposes",
      price: 494,
      image: "https://placeimg.com/500/500/tech",
      location: "East Vicentaborough",
      listed: "2022-02-03T13:00:00.000Z",
    },
  ],
  count: "38",
};

export const searchProducts2 = {
  products: [
    {
      product_id: 39,
      title: "Licensed Granite Cheese",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 811,
      image: "https://placeimg.com/500/500/people",
      location: "East Filibertofurt",
      listed: "2022-02-03T13:00:00.000Z",
    },
    {
      product_id: 43,
      title: "Fantastic Frozen Soap",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 694,
      image: "https://placeimg.com/500/500/arch",
      location: "Kissimmee",
      listed: "2022-01-31T13:00:00.000Z",
    },
    {
      product_id: 10,
      title: "Rustic Concrete Bike",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 458,
      image: "https://placeimg.com/500/500/nature",
      location: "Funkville",
      listed: "2022-01-29T13:00:00.000Z",
    },
    {
      product_id: 31,
      title: "Intelligent Concrete Chips",
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      price: 183,
      image: "https://placeimg.com/500/500/nature",
      location: "Lake Ludie",
      listed: "2022-01-23T13:00:00.000Z",
    },
    {
      product_id: 28,
      title: "Unbranded Cotton Hat",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 76,
      image: "https://placeimg.com/500/500/tech",
      location: "Port Ricky",
      listed: "2022-01-18T13:00:00.000Z",
    },
    {
      product_id: 35,
      title: "Refined Cotton Ball",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 448,
      image: "https://placeimg.com/500/500/nature",
      location: "Marionton",
      listed: "2022-01-18T13:00:00.000Z",
    },
    {
      product_id: 44,
      title: "Rustic Cotton Ball",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 87,
      image: "https://placeimg.com/500/500/arch",
      location: "Lake Zackton",
      listed: "2022-01-16T13:00:00.000Z",
    },
    {
      product_id: 22,
      title: "Awesome Wooden Shirt",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 701,
      image: "https://placeimg.com/500/500/nature",
      location: "North Frankie",
      listed: "2022-01-14T13:00:00.000Z",
    },
    {
      product_id: 7,
      title: "Handmade Granite Cheese",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 836,
      image: "https://placeimg.com/500/500/animals",
      location: "West Estaton",
      listed: "2022-01-13T13:00:00.000Z",
    },
    {
      product_id: 5,
      title: "Refined Cotton Ball",
      description:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      price: 363,
      image: "https://placeimg.com/500/500/arch",
      location: "Durwardton",
      listed: "2022-01-12T13:00:00.000Z",
    },
    {
      product_id: 23,
      title: "Awesome Concrete Hat",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 45,
      image: "https://placeimg.com/500/500/tech",
      location: "West Estaton",
      listed: "2022-01-08T13:00:00.000Z",
    },
    {
      product_id: 2,
      title: "Refined Cotton Ball",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 477,
      image: "https://placeimg.com/500/500/nature",
      location: "Denesikburgh",
      listed: "2022-01-06T13:00:00.000Z",
    },
    {
      product_id: 36,
      title: "Unbranded Steel Sausages",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 228,
      image: "https://placeimg.com/500/500/tech",
      location: "New Kyle",
      listed: "2022-01-05T13:00:00.000Z",
    },
    {
      product_id: 24,
      title: "Intelligent Wooden Bacon",
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      price: 901,
      image: "https://placeimg.com/500/500/animals",
      location: "South Verdieton",
      listed: "2022-01-04T13:00:00.000Z",
    },
    {
      product_id: 25,
      title: "Refined Fresh Shirt",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 560,
      image: "https://placeimg.com/500/500/arch",
      location: "Denesikburgh",
      listed: "2022-01-03T13:00:00.000Z",
    },
    {
      product_id: 47,
      title: "Intelligent Plastic Gloves",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 202,
      image: "https://placeimg.com/500/500/people",
      location: "Port Amie",
      listed: "2022-01-02T13:00:00.000Z",
    },
    {
      product_id: 48,
      title: "Unbranded Plastic Towels",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 517,
      image: "https://placeimg.com/500/500/people",
      location: "New Davonteside",
      listed: "2021-12-31T13:00:00.000Z",
    },
    {
      product_id: 11,
      title: "Gorgeous Metal Pants",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      price: 910,
      image: "https://placeimg.com/500/500/arch",
      location: "North Celia",
      listed: "2021-12-31T13:00:00.000Z",
    },
  ],
  count: "38",
};

export const searchCategory = {
  products: [
    {
      product_id: 13,
      title: "Licensed Concrete Fish",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      price: 822,
      image: "https://placeimg.com/500/500/nature",
      location: "Padbergmouth",
      listed: "2022-02-25T13:00:00.000Z",
    },
    {
      product_id: 34,
      title: "Rustic Concrete Bike",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 292,
      image: "https://placeimg.com/500/500/tech",
      location: "South Darienbury",
      listed: "2022-02-19T13:00:00.000Z",
    },
    {
      product_id: 23,
      title: "Awesome Concrete Hat",
      description:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      price: 45,
      image: "https://placeimg.com/500/500/tech",
      location: "West Estaton",
      listed: "2022-01-08T13:00:00.000Z",
    },
    {
      product_id: 48,
      title: "Unbranded Plastic Towels",
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      price: 517,
      image: "https://placeimg.com/500/500/people",
      location: "New Davonteside",
      listed: "2021-12-31T13:00:00.000Z",
    },
  ],
  count: "4",
};
