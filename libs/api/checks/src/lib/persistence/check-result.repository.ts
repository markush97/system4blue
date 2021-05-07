import { EntityRepository } from "typeorm";
import { CheckResultEntity } from "./check-result.entity";
import { BasicRepository } from '@system4blue/api/crud';
import { UUID4 } from "@system4blue/types";

@EntityRepository(CheckResultEntity)
export class CheckResultRepository extends BasicRepository<CheckResultEntity> {

}
