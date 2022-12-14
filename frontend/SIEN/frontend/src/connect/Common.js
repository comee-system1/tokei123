const LOG_DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost'; //"http://localhost";
const LOG_PORT = process.env.NODE_ENV === 'production' ? '' : '8000'; //"8000";
const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.30.32'; //"";
const FOLDER = "SIENP";
const FOLDER_COMMON = "COMMON";

export function selectFolder(file) {

    let folder = FOLDER;
    if (file === 'userListPrint') {
        folder = FOLDER_COMMON;
    }
    return folder;
}

export default {
    DOMAIN,
    LOG_DOMAIN,
    LOG_PORT,
    FOLDER,
    FOLDER_COMMON,
    selectFolder
}