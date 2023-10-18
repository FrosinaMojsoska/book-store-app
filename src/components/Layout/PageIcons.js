import classes from "./PageIcons.module.css";
import PlaneIcon from "../UI/PlaneIcon";
import LockIcon from "../UI/LockIcon";
import RedoIcon from "../UI/RedoIcon";
const PageIcons = () => {
  return (
    <section className={classes["icons-container"]}>
      <div className={classes.icons}>
        <PlaneIcon />
        <div className={classes.content}>
          <h3>free shipping</h3>
          <p>order over $50</p>
        </div>
      </div>

      <div className={classes.icons}>
        <LockIcon />
        <div className={classes.content}>
          <h3>secure payment</h3>
          <p>100% secure payment</p>
        </div>
      </div>
      <div className={classes.icons}>
        <RedoIcon />
        <div className={classes.content}>
          <h3>easy returns</h3>
          <p>10 days returns</p>
        </div>
      </div>
    </section>
  );
};
export default PageIcons;
