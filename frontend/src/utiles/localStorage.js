import crypto from 'crypto-js';
// 暗号化キー
var txt_key = "0123456789ABCDEF0123456789ABCDEF";


/***********
 * key: 名前 val : 値
 */
function setlocalStorageEncript(key,val) {
  var utf8_plain = crypto.enc.Utf8.parse(val);
  var encrypted = crypto.AES.encrypt( utf8_plain, txt_key );
  var encrypted_strings = encrypted.toString();
  localStorage.setItem(key, encrypted_strings.toString());

}
function getlocalStorageEncript(key) {
  const ecryptedData = localStorage.getItem(key)
  if (ecryptedData == null) {
    return 0;
  } else {
    const decrypted = crypto.AES.decrypt(ecryptedData, txt_key);
    var decrypted_strings = decrypted.toString(crypto.enc.Utf8);
    return decrypted_strings;
  }
}
export default {
    setlocalStorageEncript,
    getlocalStorageEncript,
};