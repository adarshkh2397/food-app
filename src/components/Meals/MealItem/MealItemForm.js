import { useState, useEffect } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (props.cartItems.length === 0) {
      setQuantity(1);
    }
  }, [props.cartItems]);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = quantity;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          value: quantity,
          onChange: quantityChangeHandler,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <p className={styles["text-danger"]}>
          Please enter a valid amount(1-5).
        </p>
      )}
    </form>
  );
};

export default MealItemForm;
