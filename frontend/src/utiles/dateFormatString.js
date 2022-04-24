import moment from 'moment';

let week = ['日', '月', '火', '水', '木', '金', '土'];

function dateFormatString(str) {
    let sp = str.split('/');
    let w = moment(str).day();
    let color = '';
    if (w == 0) color = 'red--text';
    if (w == 6) color = 'blue--text';
    let string = "<div class='"+color+"' >"+sp[2].replace(/^0/,"")+"</div>";
    string += "<div class='"+color+"'>"+week[w]+"</div>";
    return string;

}

export default {
    dateFormatString,
};
