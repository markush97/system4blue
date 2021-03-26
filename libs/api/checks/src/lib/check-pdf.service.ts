import { Injectable } from '@nestjs/common';
import { CheckResult, CheckTemplate } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';

import { join } from 'path';
import * as PdfPrinter from 'pdfmake';
import { DocumentDefinition, ITable, IColumns, IQR, QR, Columns, Table, Cell, IText, IImg } from 'pdfmake-wrapper/server';
import { CheckResultService } from './check-result.service';
import { CheckTemplateService } from './check-template.service';

const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};
@Injectable()
export class CheckPdfService {
  private printer = new PdfPrinter(fonts);

  constructor(
    private readonly checkResultService: CheckResultService,
    private readonly checkTemplateService: CheckTemplateService
  ) {}

  async createPdf(id: UUID4, response): Promise<string> {
    const checker = 'TestChecker';

    const check = await this.checkTemplateService.getById(id);

    const doc = new DocumentDefinition();

    doc.pageOrientation('landscape');
    doc.footer(this.buildFooter('Test2'));
    doc.pageSize('A4');
    doc.add(await this.buildContent(check, checker));
    doc.info({
      title: 'Prüfbericht',
      author: 'checker',
      creationDate: new Date().toLocaleDateString(),
      creator: 'System4Blue',
    });
    doc.defaultStyle({font: 'Helvetica'})
    doc.styles({
      header: {
        fontSize: 18,
        margin: [0, 0, 0, 10],
      },
      footer: {
        fontSize: 10,
        margin: [15, 0, 15, 0],
      },
      checkTable: {
        margin: [15,15,15,15],
        width: 500
      }
    });

    const file_name = `Prüfbericht_Test.pdf`;

    const pdfDoc = this.printer.createPdfKitDocument(doc.getDefinition());
    pdfDoc.pipe(response);
    pdfDoc.end();

    return file_name;
  }

  private buildContent(template: CheckTemplate, checker: string) {
    return [
      this.buildHeader('Test3', 'https://test.at'),
      this.buildCheckTable(template),
      { text: ['Prüfung durchgeführt von: ',  {text: checker, bold: true} ], fontSize: 15},
      { text: 'Unterschrift: ' },
      { text: 'Kommandant: ' },
    ];
  }

  private buildHeader(reportTopic: string, qrLink: string): IColumns {
    const logo: IImg = {image: join(__dirname, 'assets/check-logo.png'), alignment: 'left', fit: [75, 75]};
    const title: IText = {text: `Prüfbericht für: ${reportTopic}`, alignment: 'center', bold: true}

    const header = new Columns([logo, title, this.buildQR(qrLink)]).end
    return header;
  }


  private buildFooter(checkName: string) {
    return (currentPage?: number, pageCount?: number) => {
      return {
        columns: [
          checkName,
          {
            text: `Prüfbericht exportiert am: ${new Date().toLocaleDateString()}`,
            alignment: 'center',
          },
          {
            text: `Seite ${currentPage.toString()} von ${pageCount}`,
            alignment: 'right',
          },
        ],
        style: 'footer',
      };
    };
  }

  private buildCheckTable(template: CheckTemplate): ITable {
    const results:CheckResult[] = [];
    const checkTasks = template.checks;

    const tableContent: (Record<string, unknown> | string)[][] = [];

    const widths: ('*'|'auto'|number)[] = ['*'];

    const header: (Record<string, unknown> | string)[] = [
      { text: 'Überprüfung', bold: true },
    ];

    results.forEach(async (check) => {
      header.push({ text: check.item.externalId, bold: true });
      widths.push(25);
    });

    tableContent.push(header);

    checkTasks.forEach((task) => {
      const row: (Record<string, unknown> | string)[] = [
        { text: task, bold: true },
      ];

      results.forEach((check) => {
        if (check.successfullChecks.includes(task)) {
          row.push('i.O.');
        } else if (check.failedChecks.includes(task)) {
          row.push('Fehler');
        } else {
          row.push('k.A.');
        }
      });

      tableContent.push(row);
    });

    return {
      style: 'checkTable',
      table: {
        widths,
        body: tableContent,
      },
    };
  }

  private buildQR(link: string): IQR {
    return new QR(link).fit(75).alignment('right').end;
  }
}
