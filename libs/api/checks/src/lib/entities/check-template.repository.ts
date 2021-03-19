import { CheckTemplate } from "@system4blue/api-interfaces";
import { AbstractRepository, EntityRepository } from "typeorm";
import { CheckTemplateEntity } from "./check-template.entity";

@EntityRepository(CheckTemplateEntity)
export class CheckTemplateRepository extends AbstractRepository<CheckTemplateEntity> {
  async create(entity: CheckTemplate): Promise<CheckTemplate> {
    return this.repository.save(this.repository.create(entity));
  }

  async findById(id: string): Promise<CheckTemplate> {
    return this.repository.findOne(id, {relations: ['checkResults']});
  }

  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: string, entity: CheckTemplate): Promise<void> {
    this.repository.update(id, entity);
  }

  async findMany(): Promise<CheckTemplate[]> {
    return this.repository.find();
  }

}
