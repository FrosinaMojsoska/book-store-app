import classes from "./BooksSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Book from "./Book";
import { useState, useEffect } from "react";

const BookSection = (props) => {
  const [books, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getBooks = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://book-store-ebcea-default-rtdb.europe-west1.firebasedatabase.app/books.json"
    );

    const responseData = await response.json();

    const loadedBooks = [];
    for (const key in responseData) {
      loadedBooks.push({
        ...responseData[key],
      });
    }
    setBook(loadedBooks);
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  let content;
  let filteredBooks = books;
  if (props.title !== "All Books") {
    filteredBooks = filteredBooks.filter((book) => book.genre === props.title);
  }
  if (isLoading) content = <p>Loading</p>;
  else {
    content = filteredBooks.map((book) => (
      <SwiperSlide key={book.id}>
        <Book onBookDetails={props.onBookDetails} key={book.id} book={book} />
      </SwiperSlide>
    ));
  }

  return (
    <section className={classes.featured} id="featured">
      <h1 className={classes.heading}>
        <span>{props.title}</span>
        <div className={classes["featured-slider"]}>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            slidesPerView={5}
            spaceBetween={11}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination]}
          >
            <div className={classes.wrapper}>{content}</div>
          </Swiper>
        </div>
      </h1>
    </section>
  );
};

export default BookSection;
