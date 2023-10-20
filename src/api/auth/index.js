import { axios } from "../../lib/axios";

export const postLogin = (...args) => axios.post("auth/login", ...args);
