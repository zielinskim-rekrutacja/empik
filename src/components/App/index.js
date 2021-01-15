import React, { useState, useEffect } from "react";
import styles from "./app.module.css";

import formatPrice from "../../helpers/formatPrice";
import sum from "../../helpers/sum";
import api from "../../api";

import Product from "../Product";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await api.getCart;
      setData(cartData);
      /* TODO: Add a fallback mechanism to automatically re-fetch if a request fails */
    };
    fetchData();
  }, []);

  const total = data.length > 1 && sum(data, "price");

  return (
    <>
      <div className={styles.container}>
        {data === [] && <p>Fetching...</p>}
        {data.length > 1 && (
          <ul>
            {data.map(product => (
              <li className="row" key={product.pid}>
                {product.name}, price: {formatPrice(product.price)}
              </li>
            ))}
          </ul>
        )}
        {typeof total === "number" && <p>Total: {formatPrice(total)}</p>}
      </div>
      <Product
        name="Patelnia"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        min={1}
        max={10}
      />
      <Product
        name="Patelnia"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        min={1}
        max={10}
        isBlocked={true}
      />
    </>
  );
};

export { App };
