import moment from 'moment';

function dateFormatString(str,define_week) {
    let sp = str.split('/');
    let w = moment(str).day();
    let color = '';
    if (w == 0) color = 'red--text';
    if (w == 6) color = 'blue--text';
    let string =
        "<div style='line-height:1.2em;white-space: nowrap;' class='text-center pa-0 text-caption " +
        color +
        "''>" +
        sp[2] +
        "<br />" +
        define_week[w] +
        '</div>';
    return string;
}

export default {
    dateFormatString,
};
