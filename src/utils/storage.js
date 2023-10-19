const storage = {
  getToken: () => window.localStorage.getItem('_auth'),
  getTokenType: () => window.localStorage.getItem('_auth_type'),
  setToken: (token) => {
    window.localStorage.setItem('token', JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem('token');
  },
};

export default storage;
