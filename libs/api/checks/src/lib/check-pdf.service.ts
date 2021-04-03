import { Injectable } from '@nestjs/common';
import { UUID4 } from '@system4blue/types';

import { CheckResultService } from './check-result.service';
import { CheckRunService } from './check-run.service';
import { CheckTemplateService } from './check-template.service';

import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class CheckPdfService {
   constructor(
    private readonly checkResultService: CheckResultService,
    private readonly checkTemplateService: CheckTemplateService,
    private readonly checkRunService: CheckRunService
  ) {}

  async createCheckRunReportPdf(runId: UUID4, response): Promise<Buffer> {
    const checkRun = this.checkRunService.getById(runId);

    const content = fs.readFileSync(
      path.resolve(__dirname, './assets/pdf-reports/check-run-report.hbs'),
      'utf-8'
    );

    const template = handlebars.compile(content);
    const html = template({});

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
        bottom: '0px'
      }
    });

    await browser.close();
    return buffer;
  }
}
