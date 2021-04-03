import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckTemplateRepository } from './persistence/check-template.repository';
import { CheckResultRepository } from './persistence/check-result.repository';
import { CheckResultService } from './check-result.service';
import { CheckTemplateService } from './check-template.service';
import { CheckPdfService } from './check-pdf.service';
import { CheckRunRepository } from './persistence/check-run.repository';
import { CheckRunService } from './check-run.service';


@Module({
  imports: [TypeOrmModule.forFeature([CheckTemplateRepository, CheckResultRepository, CheckRunRepository])],
  controllers: [CheckController],
  providers: [CheckResultService, CheckTemplateService, CheckPdfService, CheckRunService],
  exports: [CheckResultService],
})
export class ChecksModule {}
