import { Controller } from '@nestjs/common';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private PartnersService: PartnersService) {}
}
