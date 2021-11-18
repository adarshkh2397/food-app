import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    city: true,
    pincode: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const pincodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPincode = pincodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPincodeIsValid = isSixChars(enteredPincode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      pincode: enteredPincodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPincodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    //Submit
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      pincode: enteredPincode,
    });
  };

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;
  const addressControlClasses = `${styles.control} ${
    formInputsValidity.address ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;
  const pincodeControlClasses = `${styles.control} ${
    formInputsValidity.pincode ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>
      <div className={pincodeControlClasses}>
        <label htmlFor="pincode">PIN Code</label>
        <input type="text" id="pincode" ref={pincodeInputRef} />
        {!formInputsValidity.pincode && (
          <p>Pincode should be 6 characters long!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
