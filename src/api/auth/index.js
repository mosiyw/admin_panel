import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const postLogin = (...args) =>
  fetch(`http://localhost:5000/api/${Endpoint.Login}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(...args),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => data);
