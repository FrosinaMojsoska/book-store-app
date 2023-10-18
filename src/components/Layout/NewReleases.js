import classes from "./NewReleases.module.css";
import TheProspector from "../../assets/TheProspectors.jpg";
import BookDetails from "../Books/BookDetails/BookDetails";
import { useEffect, useState } from "react";

const NewReleases = (props) => {
  const [newBook, setNewBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const newBookGet = async () => {
    setIsLoading(true);
    const newBookResult = await fetch(
      "https://book-store-ebcea-default-rtdb.europe-west1.firebasedatabase.app/books/10.json"
    );
    const book = await newBookResult.json();
    setNewBook(book);

    setIsLoading(false);
  };

  useEffect(() => {
    newBookGet();
  }, []);

  const buyBookHandler = () => {
    props.onBookDetails({
      id: newBook.id,
      name: newBook.name,
      author: newBook.author,
      price: newBook.price,
      description: newBook.description,
      genre: newBook.genre,
    });
  };
  const newReleaseContent = isLoading ? (
    <p>isLoading..</p>
  ) : (
    <div className={classes.row}>
      <div className={classes.content}>
        <h2>New Releases</h2>
        <p>
          With vivid descriptions and complex characters, The Prospectors is a
          gripping tale of adventure, sacrifice, and perseverance. Whether
          you're a fan of historical fiction or simply love a good adventure
          story, this novel is sure to captivate your attention from start to
          finish.
        </p>
        <button onClick={buyBookHandler}>Buy now</button>
      </div>
      <div className={classes["book-slider"]}>
        <div className={classes.wraper}>
          <a href="#">
            <img src={TheProspector} alt="The Prospector Book" />
          </a>
        </div>
      </div>
    </div>
  );
  return (
    <section className={classes.home} id="home">
      {newReleaseContent}
    </section>
  );
};
export default NewReleases;
