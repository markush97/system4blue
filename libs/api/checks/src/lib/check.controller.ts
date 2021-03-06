import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  CheckResult,
  CheckRun,
  CheckTemplate,
  PaginationResult,
  QueryParams,
} from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { get } from 'http';
import { CheckPdfService } from './check-pdf.service';
import { CheckResultService } from './check-result.service';
import { CheckRunService } from './check-run.service';
import { CheckTemplateService } from './check-template.service';
import { CheckResultDto } from './dto/check-result.dto';
import { CheckRunDto } from './dto/check-run.dto';
import { CheckTemplateDto } from './dto/check-template.dto';
@Controller('checks')
export class CheckController {
  constructor(
    private readonly checkResultService: CheckResultService,
    private readonly checkTemplateService: CheckTemplateService,
    private readonly checkPdfService: CheckPdfService,
    private readonly checkRunService: CheckRunService
  ) {}

  @Get('results/:id')
  async getCheckResult(@Param('id') id: UUID4): Promise<CheckResult> {
    return this.checkResultService.getById(id);
  }

  @Get('results')
  async getMany(
    @Query() queryParams: QueryParams<CheckResult>
  ): Promise<PaginationResult<CheckResult>> {
    return this.checkResultService.getMany(queryParams);
  }

  @Post('results')
  async createCheckResult(@Body() check: CheckResultDto): Promise<CheckResult> {
    return this.checkResultService.create(check);
  }

  @Delete('results/:id')
  async deleteCheckResult(@Param('id') id: UUID4): Promise<void> {
    return this.checkResultService.delete(id);
  }

  @Get('template/:id')
  async getCheckTemplate(@Param('id') id: UUID4): Promise<CheckTemplate> {
    return this.checkTemplateService.getById(id);
  }

  @Get('template')
  async getManyTemplates(
    @Query() queryParams: QueryParams<CheckTemplate>
  ): Promise<PaginationResult<CheckTemplate>> {
    return this.checkTemplateService.getMany(queryParams);
  }

  @Post('template')
  async createCheckTemplate(
    @Body() check: CheckTemplateDto
  ): Promise<CheckTemplate> {
    return this.checkTemplateService.create(check);
  }

  @Delete('template/:id')
  async deleteCheckTemplate(@Param('id') id: UUID4): Promise<void> {
    return this.checkTemplateService.delete(id);
  }

  @Get('runs/:id')
  async getRun(@Param('id') id: UUID4): Promise<CheckRun> {
    return this.checkRunService.getById(id);
  }

  @Get('runs')
  async getManyRuns(
    @Query() queryParams: QueryParams<CheckRun>
  ): Promise<PaginationResult<CheckRun>> {
    return this.checkRunService.getMany(queryParams);
  }

  @Post('runs')
  async createRun(
    @Body() checkRun: CheckRunDto
  ): Promise<CheckRun> {
    return this.checkRunService.create(checkRun);
  }

  @Get('runs/:id/pdf')
  async getPDF(@Param('id') id: UUID4, @Res() res): Promise<void> {
    const buffer = await this.checkPdfService.createCheckRunReportPdf(id);

    res.set({
      'Content-Type': 'application/pdf',
      //'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': buffer.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
  }
}
