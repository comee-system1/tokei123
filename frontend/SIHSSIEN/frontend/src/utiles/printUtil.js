import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';

let gridList = [];
let thickRightVLineList = [];
let subTitleList = [];

const DIRECTION = {
    portrait: 1, // 縦
    landscape: 2, // 横
};

function setGridList(list) {
    // 印刷対象のgridを設定
    gridList = list;
}

function setThickRightVLineList(list) {
    // 右側の縦線を太線化する列リスト設定
    thickRightVLineList = list;
}

function setSubTitleList(list) {
    // サブタイトルリスト
    subTitleList = list;
}
/**************************
 * 印刷実行
 * title : 帳票タイトル
 * dirction : 印刷方向(DIRECTION参照)
 * gridJoinPrint : 複数のgridが印刷対象の場合は続けて印刷するかどうか(false:別ページ印刷)
 */
function printExec(title, dirction, gridJoinPrint = false) {
    if (setGridList.length == 0) {
        alert('印刷対象が設定されていません。');
    }
    let doc = new wijmo.PrintDocument({
        title: ''
    });
    if (dirction == DIRECTION.portrait) {
        doc.append('<style type="text/css">@page { size:portrait;font-family: "メイリオ"; }</style>');
    } else {
        doc.append('<style type="text/css">@page { size:landscape;font-family: "メイリオ"; }</style>');
    }
    let isFirstGrd = true;
    for (let i = 0; i < gridList.length; i++) {
        if (gridJoinPrint && i == 1) {
            isFirstGrd = false;
        }
        let tbl = renderTable(title, gridList[i], isFirstGrd);
        doc.append(tbl);
        if (gridJoinPrint) {
            doc.append('<div style="height:20px"></div>') // 強制改ページなし
        } else {
            doc.append('<div style="page-break-after: always;"></div>') // 強制改ページ
        }
    }

    doc.print();
}

function renderTable(title, flex, isFirstGrd) {
    // start table
    let tbl = '<table style="border-collapse: collapse " >';
    //
    // headers
    tbl += '<thead>';
    if (isFirstGrd) {
        tbl += `<tr><th colspan="${flex.columnHeaders.columns.length}"><h2>` + title + `</h2></th></tr>`;
        for (let sub = 0; sub < subTitleList.length; sub++) {
            tbl += `<tr><th colspan="${flex.columnHeaders.columns.length}"><p align="left" style="font-weight: normal;">` + subTitleList[sub] + `</p></th></tr>`;
        }
    }
    if (flex.headersVisibility & grid.HeadersVisibility.Column) {
        for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
            tbl += renderRow(flex.columnHeaders, r, flex);
        }
    }
    tbl += '</thead>';
    //
    // body
    tbl += '<tbody">';
    for (let r = 0; r < flex.rows.length; r++) {
        tbl += renderRow(flex.cells, r, flex);
    }
    tbl += '</tbody>';
    //
    // done
    tbl += '</table>';
    return tbl;
}
//
function renderRow(panel, r, flex) {
    let tr = '',
        row = panel.rows[r];
    //
    if (row.renderSize > 0) {
        tr += '<tr>';
        //
        panel.columns.forEach((col, c) => {
            if (col.renderSize > 0 && col.visible) {
                // get cell style, content
                let headerstyle = `width:${col.renderSize}px;height:${panel.rows[r].renderHeight}px;font-size: 12px;border: 1px solid black;padding:2px;white-space:pre-wrap;`;
                let style = `width:${col.renderSize}px; text-align:${col.getAlignment()};vertical-align:top;font-size: 12px;border: 1px solid black;padding:2px;white-space:pre-wrap; word-wrap:break-word;`;
                console.log(panel.getCellData(r, c, true));
                console.log(panel.getCellElement(r, c));
                if (panel.getCellElement(r, c) != null) {
                    console.log(`text-align:${panel.getCellElement(r, c).style.textAlign};vertical-align:middle;`);
                    console.log(`justify-content:${panel.getCellElement(r, c).style.justifyContent};`);
                    console.log(`align-items:${panel.getCellElement(r, c).style.alignItems};`);
                    if (panel.getCellElement(r, c).style.verticalAlign.length > 0) {
                        style += `vertical-align:${panel.getCellElement(r, c).style.verticalAlign};`;
                    }
                    if (panel.getCellElement(r, c).style.textAlign.length > 0) {
                        style += `text-align:${panel.getCellElement(r, c).style.textAlign};`;
                    }
                    if (panel.getCellElement(r, c).style.justifyContent.length > 0) {

                        style += `justify-content:${panel.getCellElement(r, c).style.justifyContent};`;
                    }
                    if (panel.getCellElement(r, c).style.alignItems.length > 0) {
                        style += `align-items:${panel.getCellElement(r, c).style.alignItems};`;
                    }
                }
                let thisckCol = thickRightVLineList.filter(function (colindex) {
                    return colindex == c;
                });
                if (thisckCol.length == 0 && c < flex.columnHeaders.columns.length - 1) {
                    headerstyle += `border-right: 1px solid darkgray;`;
                    style += `border-right: 1px solid darkgray;`;
                }
                let content = panel.getCellData(r, c, true);
                //
                if (!row.isContentHtml && !col.isContentHtml) {
                    content = wijmo.escapeHtml(content);
                }
                //
                // add cell to row
                if (panel.cellType == grid.CellType.ColumnHeader) {

                    let rowspan = 1;
                    let colspan = 1;
                    let txt = panel.getCellData(r, c, false);
                    let prerowtxt = "";
                    let precoltxt = "";
                    if (r > 0) {
                        prerowtxt = panel.getCellData(r - 1, c, false);
                    }
                    if (c > 0) {
                        precoltxt = panel.getCellData(r, c - 1, false);
                    }
                    if (txt != prerowtxt) {
                        for (let r2 = r + 1; r2 < panel.rows.length; r2++) {
                            if (txt == panel.getCellData(r2, c, false)) {
                                rowspan++;
                            }
                        }
                    }
                    if (txt != precoltxt) {
                        for (let c2 = c + 1; c2 < panel.columns.length; c2++) {
                            if (panel.columns[c2].renderSize > 0 && panel.columns[c2].visible) {
                                if (txt == panel.getCellData(r, c2, false)) {
                                    colspan++;
                                } else {
                                    // 一度でも途切れれば結合しない
                                    break;
                                }
                            }
                        }
                    }
                    if (txt != prerowtxt && txt != precoltxt) {
                        let tmptr = `<th `;
                        if (colspan > 1) {
                            tmptr += `colspan="${colspan}" `;
                        }
                        if (rowspan > 1) {
                            tmptr += `rowspan="${rowspan}" `;
                        }
                        // 縦書きを反映する
                        if (panel.getCellElement(r, c).style.writingMode == "vertical-rl") {
                            tmptr += `style="${headerstyle}"><span style="writing-mode: vertical-rl;text-align:left">${content}</span></th>`;
                        } else {
                            tmptr += `style="${headerstyle}">${content}</th>`;
                        }
                        tr += tmptr;
                    }
                } else {
                    // show boolean values as checkboxes(チェックボックスを表示する場合)
                    let raw = panel.getCellData(r, c, false);
                    if (raw === true) {
                        content = '&#9745;';
                    } else if (raw === false) {
                        content = '&#9744;';
                    }
                    //
                    tr += `<td style="${style}">${content}</td>`;
                }
            }
        });
        //
        tr += '</tr>';
    }
    //
    return tr;
}

export default {
    DIRECTION,
    setGridList,
    setThickRightVLineList,
    setSubTitleList,
    printExec,
};