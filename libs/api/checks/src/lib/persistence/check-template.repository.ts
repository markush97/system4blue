import { EntityRepository } from "typeorm";
import { CheckTemplateEntity } from "./check-template.entity";
import { BasicRepository } from '@system4blue/api/crud';

@EntityRepository(CheckTemplateEntity)
export class CheckTemplateRepository extends BasicRepository<CheckTemplateEntity> {

}
