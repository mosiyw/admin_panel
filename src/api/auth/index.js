import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const postLogin = (...args) => {
  console.log(...args);

  return axios.post(Endpoint.Login, ...args);
};
