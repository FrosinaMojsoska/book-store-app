import { useContext, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./BookDetails.module.css";
import CartContext from "../../../store/cart-context";
const BookDetails = (props) => {

  const cartCtx = useContext(CartContext);

  const bookAmountRef = useRef(0);

  const addBookHandler = (event) => {
  event.preventDefault();
    cartCtx.addBook({
        id:props.book.id,
        name:props.book.name,
        amount:bookAmountRef.current.value,
        price:props.book.price

    });
    props.onAddBook(props.book.name);

  };

  return (
    <Modal>
      <div className={classes.card}>
        <div className={classes.image}>
          <img
            src={require(`../../../assets/${props.book.name
              .split(" ")
              .join("")
              .toString()}.jpg`)}
          />
        </div>
        <div className={classes.content}>
          <h3>{props.book.name}</h3>
          <p>{props.book.description}</p>
          <h4>Price:</h4>
          <span>{props.book.price}</span>
        </div>
        <div className={classes.form}>
          <form onSubmit={addBookHandler}>
            <input
              ref={bookAmountRef}
              type="number"
              defaultValue={1}
              max={5}
              min={1}
            />
            <div className={classes.action}>
              <button type="submit">Buy</button>
              <button type="button" onClick={props.onCloseModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default BookDetails;
