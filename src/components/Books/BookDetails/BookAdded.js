import Modal from "../../UI/Modal";
import classes from "./BookAdded.module.css";
const BookAdded = (props) => {
  return (
    <Modal>
      <div className={classes["book-added"]}>
        <p>
          The book <span>{props.book} </span> is added!
        </p>
      </div>
    </Modal>
  );
};
export default BookAdded;
