
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
};

export default Tools;
