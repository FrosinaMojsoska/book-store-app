import CartIcon from "../UI/CartIcon";
import SearchIcon from "../UI/SearchIcon";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes["header-1"]}>
        <a href="#" className={classes.logo}>
          Book Store
        </a>

        <div className={classes.icons}>
          <button onClick={props.onCartSelected}>
            <CartIcon />
            <span>My Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
