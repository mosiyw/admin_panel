import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const getProductsList = (...args) =>
  axios.get(Endpoint.Products, {
    withCredentials: true,
  });
