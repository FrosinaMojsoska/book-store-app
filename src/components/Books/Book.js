import classes from "./Book.module.css";
const Book = (props) => {
  const bookDetailsHandler = () => {
    props.onBookDetails(props.book);
  };
  return (
    <div className={classes.box}>
      <div className={classes.image}>
        <img
          src={require(`../../assets/${props.book.name
            .split(" ")
            .join("")
            .toString()}.jpg`)}
          alt={props.book.name}
        />
      </div>
      <div className={classes.content}>
        <h3>{props.book.name}</h3>
        <div className={classes.price}>{props.book.price}</div>
        <button onClick={bookDetailsHandler} className={classes.btn}>
          Details
        </button>
      </div>
    </div>
  );
};

export default Book;
