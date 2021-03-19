import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CheckResult, CheckTemplate } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { CheckPdfService } from './check-pdf.service';
import { CheckResultService } from './check-result.service';
import { CheckTemplateService } from './check-template.service';
@Controller('check')
export class CheckController {
  constructor(private readonly checkResultService: CheckResultService, private readonly checkTemplateService: CheckTemplateService, private readonly checkPdfService: CheckPdfService) {}

  @Get(':id')
  async getCheckResult(@Param('id') id: UUID4): Promise<CheckResult> {
    return this.checkResultService.getById(id);
  }

  @Get()
  async getCheckResultList(): Promise<CheckResult[]> {
    return this.checkResultService.getMany();
  }

  @Post()
  async createCheckResult(@Body() check: CheckResult): Promise<CheckResult> {
    return this.checkResultService.create(check);
  }

  @Delete(':id')
  async deleteCheckResult(@Param('id') id: UUID4): Promise<void> {
    return this.checkResultService.delete(id);
  }

  @Get('template/:id')
  async getCheckTemplate(@Param('id') id: UUID4): Promise<CheckTemplate> {
    return this.checkTemplateService.getById(id);
  }

  @Get('template')
  async getCheckTemplatesList(): Promise<CheckTemplate[]> {
    return this.checkTemplateService.getMany();
  }

  @Post('template')
  async createCheckTemplate(@Body() check: CheckTemplate): Promise<CheckTemplate> {
    return this.checkTemplateService.create(check);
  }

  @Delete('template/:id')
  async deleteCheckTemplate(@Param('id') id: UUID4): Promise<void> {
    return this.checkTemplateService.delete(id);
  }

  @Get('pdf/:id')
  async getPDF(@Param('id') id: UUID4, @Res() res): Promise<string> {
    return this.checkPdfService.createPdf(id, res);
  }
}
