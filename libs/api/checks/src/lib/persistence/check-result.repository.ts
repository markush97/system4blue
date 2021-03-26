import { CheckResult } from "@system4blue/api-interfaces";
import { AbstractRepository, EntityRepository } from "typeorm";
import { CheckResultEntity } from "./check-result.entity";

@EntityRepository(CheckResultEntity)
export class CheckResultRespository extends AbstractRepository<CheckResultEntity> {
  async create(entity: CheckResultEntity): Promise<CheckResult> {
    return this.repository.save(this.repository.create(entity));
  }

  async findById(id: string): Promise<CheckResult> {
    return this.repository.findOne(id, {relations: ['item']});
  }

  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: string, entity: CheckResult): Promise<void> {
    this.repository.update(id, entity);
  }

  async findMany(): Promise<CheckResult[]> {
    return this.repository.find();
  }

}
