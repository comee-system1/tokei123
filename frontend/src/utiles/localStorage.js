function setlocalStorage(key,val) {
  localStorage.setItem(key, val);
}
function getlocalStorage(key) {
    let tmpval = localStorage.getItem(key);
    if (tmpval == null) {
      return 0;
    } else {
      return Number(tmpval);
    }
  }

  export default {
    setlocalStorage,
    getlocalStorage,
};