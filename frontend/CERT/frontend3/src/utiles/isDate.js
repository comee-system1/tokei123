function isDate(strDate) {
    if (strDate == "") {
        return false;
    }
    if (!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
        return false;
    }
    var date = new Date(strDate);
    if (
        date.getFullYear() != strDate.split("/")[0] ||
        date.getMonth() != strDate.split("/")[1] - 1 ||
        date.getDate() != strDate.split("/")[2]
    ) {
        return false;
    }

    return true;
}

export default {
    isDate,
};
