import Cookies from "js-cookie";

const storage = {
  getToken: () => Cookies.get("token"),
  getTokenType: () => window.localStorage.getItem("_auth_type"),
  setToken: (token) => {
    window.localStorage.setItem("token", JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem("token");
  },
};

export default storage;
