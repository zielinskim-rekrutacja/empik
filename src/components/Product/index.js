import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import styles from "./product.module.css";

import api from "../../api";

const Product = ({ name, pid, min = 1, max, isBlocked = false }) => {
  const [quantity, setQuantity] = useState(min);

  const handleChange = async (e, newQuantity) => {
    e.preventDefault();

    if (newQuantity > max || newQuantity < min) {
      setQuantity(1);
      return;
    }

    const productStatus = await api.productCheck(pid, newQuantity);

    if (
      !productStatus.success &&
      productStatus.errorType === "INCORRECT_QUANTITY"
    ) {
      setQuantity(1);
    }

    if (productStatus.success) {
      setQuantity(newQuantity);
    }
  };

  const debounceClick = useCallback(debounce(handleChange, 500), []);

  return (
    <div>
      <span className={styles.producTitle}>
        {name}, quantity: {quantity}
      </span>
      <div>
        <button
          onClick={e => debounceClick(e, quantity + 1)}
          disabled={isBlocked}
        >
          +
        </button>
        <button
          onClick={e => debounceClick(e, quantity - 1)}
          disabled={isBlocked}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Product;
