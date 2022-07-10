<template>
  <div class="container-fluid">aaaa</div>
</template>



<script>
import * as wjPdf from '@grapecity/wijmo.pdf';

export default {
  data() {
    return {
      categories: null,
    };
  },
  created() {
    let doc = new wjPdf.PdfDocument({
      header: {
        declarative: {
          text: '諸経費レポート\t&[Page] / &[Pages]',
          font: new wjPdf.PdfFont('ipaexg', 12),
          brush: '#bfc1c2',
        },
      },
      lineGap: 2,
      pageSettings: {
        margins: {
          left: 36,
          right: 36,
          top: 36,
          bottom: 36,
        },
      },
      ended: (sender, args) => wjPdf.saveBlob(args.blob, 'Document.pdf'),
    });

    doc.registerFont({
      source: 'https://demo.grapecity.com/wijmo/sample/fonts/ipaexg.ttf',
      name: 'ipaexg',
    });
    doc.setFont(new wjPdf.PdfFont('ipaexg'));
    let array = [];
    array.push({
      id: 'E892659',
      name: '正門 恵子',
      department: '営業部',
      position: '販売員',
      ssn: 'A37830',
      manager: '森上 偉久馬',
      purpose: '商用',
      attachment: true,
      advance: 1000,
      expenses: 'a',
    });
    array.forEach((employee, i, arr) => {
      // * draw captions *
      let columns = [
        { header: '日付', binding: 'date', format: 'd' },
        { header: '詳細', binding: 'description', format: 'c' },
        { header: '宿泊費', binding: 'hotel', format: 'c' },
        { header: '交通費', binding: 'transport', format: 'c' },
        { header: '食事代', binding: 'meal', format: 'c' },
        { header: '燃料費', binding: 'fuel', format: 'c' },
        { header: 'その他', binding: 'misc', format: 'c' },
        { header: '合計', binding: 'total', format: 'c' },
      ];
      let bold = new wjPdf.PdfFont('ipaexg', 10, 'normal', 'bold');
      doc.drawText('目的: ', null, null, { font: bold, continued: true });
      doc.drawText(employee.purpose);

      doc.moveDown(3);
      doc.saveState();
      let colWidth = 80;
      let rowHeight = 18;
      let y = 0;
      columns.forEach((v, idx) => {
        console.log(v);
        let x = idx * colWidth;
        //
        // doc.paths.rect(x, y, colWidth, rowHeight).fill(brush || '#f4b19b');
        //
        // let value = valueGetter != null ? valueGetter(v) : v || '';
        // let format = formatGetter != null ? formatGetter(v) : '';
        //
        // if (value !== '合計') {
        //   value = wijmo.changeType(value, wijmo.DataType.String, format);
        // }
        //
        let value = v.header;
        doc.drawText(value, x + 3, y + 5, {
          font: bold,
          height: rowHeight,
          width: colWidth,
        });
      });

      if (i < arr.length - 1) {
        doc.addPage();
      }
    });
    //
    doc.end();
  },
};
</script>
<style>
body {
  margin-bottom: 24px;
}

.container-fluid .wj-viewer {
  width: 100%;
  display: block;
}
</style>