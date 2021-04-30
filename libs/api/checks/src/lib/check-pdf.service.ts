import { Injectable } from '@nestjs/common';
import { UUID4 } from '@system4blue/types';

import { CheckRunService } from './check-run.service';

import QRCode from 'qrcode';

import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { CheckRun, CheckTemplate } from '@system4blue/api-interfaces';

@Injectable()
export class CheckPdfService {
  constructor(private readonly checkRunService: CheckRunService) {}

  async createCheckRunReportPdf(runId: UUID4): Promise<Buffer> {
    const checkRun = await this.checkRunService.getByIdForReport(runId);
    const checkTemplate = checkRun.template;

    const content = fs.readFileSync(
      path.resolve(__dirname, './assets/pdf-reports/check-run-report.hbs'),
      'utf-8'
    );

    const template = handlebars.compile(content);
    const html = template({
      qr: await this.generateQR(`http://system4.blue/checks/runs/${checkRun.id}`),
      run: checkRun,
      logo: this.loadLogo(),
      template: checkTemplate,
      currentDate: new Date().toLocaleDateString(),
      resultTable: this.buildResultTable(checkTemplate, checkRun),
    });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html);

    const buffer = await page.pdf({
      format: 'a4',
      landscape: true,
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });

    await browser.close();
    return buffer;
  }

  private async generateQR(url: string) {
    return QRCode.toDataURL(url, {errorCorrectionLevel: 'M'});
  }

  private loadLogo(): string {
    return fs.readFileSync(
      path.resolve(__dirname, './assets/pdf-reports/check-logo.png'),
      { encoding: 'base64' }
    );
  }

  private buildResultTable(
    template: CheckTemplate,
    run: CheckRun
  ): ResultTable {
    const results: ResultRow[] = [];
    const sumary: Record<string, boolean> = {};

    template.checks.forEach((task) => {
      const row = { task, taskResults: [] };

      run.checkResults.forEach((result) => {
        if (result.successfullChecks.includes(task)) {
          row.taskResults.push('success');
          sumary[result.id] = sumary[result.id] ?? true;
        } else if (result.failedChecks.includes(task)) {
          row.taskResults.push('fail');
          sumary[result.id] = false;
        } else {
          row.taskResults.push('unknown');
          sumary[result.id] = false;
        }
      });
      results.push(row);
    });

    return {rows: results, sumary: Object.values(sumary).map(value => value ? 'success' : 'fail')};
  }
}

type ResultRow = {
  task: string;
  taskResults: ('success' | 'fail' | 'unkown')[];
};

type ResultTable = {
  rows: ResultRow[];
  sumary: ('success' | 'fail')[];
};
