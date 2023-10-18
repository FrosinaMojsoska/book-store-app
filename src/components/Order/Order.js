import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Order.module.css";
import CartContext from "../../store/cart-context";

const Order = () => {
  const cartCtx = useContext(CartContext);
  cartCtx.resetCart();


  return (
    <Modal>
      <p className={classes.order}>Thank you for your order!</p>
    </Modal>
  );
};
export default Order;
