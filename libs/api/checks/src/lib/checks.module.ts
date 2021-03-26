import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckTemplateRepository } from './persistence/check-template.repository';
import { CheckResultRespository } from './persistence/check-result.repository';
import { CheckResultService } from './check-result.service';
import { CheckTemplateService } from './check-template.service';
import { CheckPdfService } from './check-pdf.service';


@Module({
  imports: [TypeOrmModule.forFeature([CheckTemplateRepository, CheckResultRespository])],
  controllers: [CheckController],
  providers: [CheckResultService, CheckTemplateService, CheckPdfService],
  exports: [CheckResultService],
})
export class ChecksModule {}
