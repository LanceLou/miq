
const Tools = {
  /**
   * Tools.getCookie: 根据指定的键name获取对应的cookie值
   * @param name 对应cookie的键值
   */
  getCookie: (name) => {
    const cookies = document.cookie.split('; ');
    let value = '';
    for (let i = 0; i < cookies.length;) {
      if (cookies[i].indexOf(name) === 0) {
        const startIndex = cookies[i].indexOf('=');
        value = cookies[i].slice(startIndex + 1);
        break;
      }
      i += 1;
    }
    return value;
  },

  getDataFromLocalStorage(key) {
    if (!window.localStorage) {
      return null;
    }
    const fromStorage = window.localStorage.getItem(key);
    return JSON.parse(fromStorage);
  },
  setDataTOLocalStorage(key, value) {
    if (!window.localStorage) {
      return null;
    }
    return window.localStorage.setItem(key, JSON.stringify(value));
  },
};

export default Tools;
