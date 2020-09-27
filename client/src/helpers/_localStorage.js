export default {
  setJson: (key, value) => {
    localStorage[key] = JSON.stringify(value);
  },
  getJSON: key => {
    const value = localStorage[key];
    return value ? JSON.parse(value) : null;
  },
  clear: () => localStorage.clear(),
};
