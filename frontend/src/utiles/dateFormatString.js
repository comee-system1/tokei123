import moment from 'moment';

function dateFormatString(str,define_week) {
    let sp = str.split('/');
    let w = moment(str).day();
    let color = '';
    if (w == 0) color = 'red--text';
    if (w == 6) color = 'blue--text';
    let string =
        "<div class='text-center " +
        color +
        "''>" +
        sp[2] +
        "</div><div class='text-center " +
        color +
        "''>" +
        define_week[w] +
        '</div>';
    return string;
}

export default {
    dateFormatString,
};
