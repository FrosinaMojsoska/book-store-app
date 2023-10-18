import React from "react";
const CartContext = React.createContext({
  books: [],
  totalAmount: 0,
  addBook: (item) => {},
  removeBook: (id) => {},
  resetCart:()=>{}
});
export default CartContext;
