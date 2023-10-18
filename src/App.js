import "./App.css";
import Header from "./components/Layout/Header";
import NewReleases from "./components/Layout/NewReleases";
import PageIcons from "./components/Layout/PageIcons";
import BookSection from "./components/Books/BooksSection";
import Footer from "./components/Layout/Footer";
import { useState, useEffect, useContext } from "react";
import BookDetails from "./components/Books/BookDetails/BookDetails";
import CartProvider from "./store/CartProvider";
import BookAdded from "./components/Books/BookDetails/BookAdded";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

function App() {

  const [book, setBook] = useState(false);
  const [bookIsAdded, setBookIsAdded] = useState(false);
  const [bookDetails, setBookDetails] = useState(false);
  const [addedBookName, setAddedBookName] = useState("");
  const [cartModalSelected, setCartModalSelected] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  const bookDetailsHandler = (selectedBook) => {
    setBook(selectedBook);
    setBookDetails(true);
  };
  const closeBookDetailsHandler = () => {
    setBookDetails(false);
  };
  const addBookHandler = (book) => {
    setAddedBookName(book);
    setBookDetails(false);
    setBookIsAdded(true);
  };

  const cartModalHandler = () => {
    setCartModalSelected(true);
  };
  const closeCartHandler = () => {
    setCartModalSelected(false);
  };
  const orderHandler = async () => {
    setCartModalSelected(false);
    setOrderModal(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookIsAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [bookIsAdded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderModal(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [orderModal]);

  
  
  const cartModalContent = cartModalSelected && (
    <Cart onOrder={orderHandler} onClose={closeCartHandler} />
  );
  const bookDetailsContent = bookDetails && (
    <BookDetails
      book={book}
      onCloseModal={closeBookDetailsHandler}
      onAddBook={addBookHandler}
    />
  );

  return (
    <>
      <CartProvider>
        <Header onCartSelected={cartModalHandler} />
        {cartModalContent}
        {bookDetailsContent}
        {bookIsAdded && <BookAdded book={addedBookName} />}
        {orderModal && <Order />}
      </CartProvider>
      <NewReleases onBookDetails={bookDetailsHandler} />
      <PageIcons />
      <BookSection onBookDetails={bookDetailsHandler} title="All Books" />
      <BookSection onBookDetails={bookDetailsHandler} title="Fantasy" />
      <BookSection onBookDetails={bookDetailsHandler} title="Mystery" />
      <Footer />
    </>
  );
}

export default App;
