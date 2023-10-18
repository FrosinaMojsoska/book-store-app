import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  books: [],
  totalAmount: 0,
};

const bookReducer = (state, action) => {
  let indexOfItem;

  let updatedBooksOrder;
  let updatedAmount;
  

  if (action.type === "Add") {
    updatedAmount =
      Number(state.totalAmount) +
      Number(action.book.price.substring(1)) * Number(action.book.amount);

    indexOfItem = state.books.findIndex((book) => book.id === action.book.id);

    if (indexOfItem >= 0) {
      //existing item
      let itemForUpdate = state.books[indexOfItem];
      let updatedItem = {
        ...itemForUpdate,
        amount: Number(itemForUpdate.amount) + Number(action.book.amount),
      };
      updatedBooksOrder = [...state.books];
      updatedBooksOrder[indexOfItem] = updatedItem;
    } else {
      //new item
      updatedBooksOrder = [...state.books, action.book];
    }

    return {
      books: updatedBooksOrder,
      totalAmount: updatedAmount,
    };
  } else if (action.type === "Remove") {
    indexOfItem = state.books.findIndex((book) => book.id === action.id);

    if (state.books[indexOfItem].amount > 1) {
      let itemForUpdate = state.books[indexOfItem];
      let updatedItem = { ...itemForUpdate, amount: +itemForUpdate.amount - 1 };
      updatedBooksOrder = [...state.books];
      updatedBooksOrder[indexOfItem] = updatedItem;
    } else {
      updatedBooksOrder = state.books.filter((book) => book.id !== action.id);
    }
    updatedAmount =
      Number(state.totalAmount) -
      Number(state.books[indexOfItem].price.substring(1));
    return {
      books: updatedBooksOrder,
      totalAmount: updatedAmount,
    };
  } else return defaultCartState;
};

const CartProvider = (props) => {
  const [cart, cartDispatch] = useReducer(bookReducer, defaultCartState);
  const addBookHandler = (book) => {
    cartDispatch({ type: "Add", book: book });
  };
  const removeBookHandler = (id) => {
    cartDispatch({ type: "Remove", id: id });
  };

  const resetCartHandler = () => {
    cartDispatch({ type: "Reset" });
  };
  const cartContext = {
    books: cart.books,
    totalAmount: cart.totalAmount,
    addBook: addBookHandler,
    removeBook: removeBookHandler,
    resetCart: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
