import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeBook(id);
  };

  const cartItemAddHandler = async (book) => {
    cartCtx.addBook({ ...book, amount: 1 });
  };

  const orderBookHandler = async () => {
    const body = JSON.stringify(...cartCtx.books);
    const response = await fetch(
      "https://book-store-ebcea-default-rtdb.europe-west1.firebasedatabase.app/order.json",
      { method: "POST", body: body, contentType: "application/json" }
    );
    cartCtx.resetCart();
    props.onOrder();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.books.map((book) => (
        <CartItem
          key={book.id}
          name={book.name}
          amount={book.amount}
          price={book.price}
          onAdd={cartItemAddHandler.bind(null, book)}
          onRemove={cartItemRemoveHandler.bind(null, book.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartCtx.books.length > 0 && (
          <button className={classes.button} onClick={orderBookHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
