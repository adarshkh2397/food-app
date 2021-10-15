import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImg from "../../assets/meals.jpg";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="a table of meals" />
      </div>
    </Fragment>
  );
};

export default Header;
