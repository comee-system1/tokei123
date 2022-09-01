const LOG_DOMAIN = "http://localhost";
const LOG_PORT = "8000";
const DOMAIN = "http://192.168.30.32";
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