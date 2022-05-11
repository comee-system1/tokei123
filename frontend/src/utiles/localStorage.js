function getlocalStorage(key) {
    let tmpval = localStorage.getItem(key);
    if (tmpval == null) {
      return 0;
    } else {
      return Number(tmpval);
    }
  }

  export default {
    getlocalStorage,
};