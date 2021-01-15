const API_ROOT = `/api`;

const api = {
  getCart: fetch(`${API_ROOT}/cart`)
    .then(res => res.json())
    .catch(err => {
      throw new Error(err);
    }),
  productCheck: (pid, quantity) => {
    if (typeof pid !== "string" || typeof quantity !== "number") {
      throw new Error("Incorrect arguments provided");
    }

    const data = {
      pid,
      quantity
    };

    return fetch(`${API_ROOT}/product/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(err => {
        throw new Error(err);
      });
  }
};

export default api;
