const LOG_DOMAIN = process.env.NODE_ENV === 'production' ? 'http://localhost' : 'http://localhost'; //"http://localhost";
const LOG_PORT = process.env.NODE_ENV === 'production' ? '3000' : '3000'; //"3000";
const DOMAIN = process.env.NODE_ENV === 'production' ? 'http://192.168.10.32:80' : 'http://192.168.30.32:80'; //"";
// export default {
//     DOMAIN,
//     LOG_DOMAIN,
//     LOG_PORT,
// }