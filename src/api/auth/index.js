import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const postLogin = (...args) => axios.post(Endpoint.Login, ...args);
