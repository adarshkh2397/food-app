import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

// const dummy_cartItems = [
//   { id: "c1", name: "sushi", amount: 2, price: 12.99 },
//   { id: "c2", name: "fries", amount: 1, price: 7.99 },
// ];

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = cartCtx.items.map((cartItem) => (
    <CartItem
      key={cartItem.id}
      name={cartItem.name}
      amount={cartItem.amount}
      price={cartItem.price}
      onAdd={cartItemAddHandler.bind(null, cartItem)}
      onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
    />
  ));

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
