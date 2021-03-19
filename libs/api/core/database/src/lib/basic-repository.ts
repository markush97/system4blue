import { AbstractRepository, ObjectLiteral } from "typeorm";

export abstract class BasicRepository<EntityType extends ObjectLiteral> extends AbstractRepository<EntityType> {
  async create(entity: EntityType): Promise<EntityType> {
    return this.repository.save(this.repository.create(entity));
  }

  async findById(id: string): Promise<EntityType> {
    return this.repository.findOne(id);
  }

  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: string, entity: EntityType): Promise<void> {
    this.repository.update(id, entity);
  }

  async findMany(): Promise<EntityType[]> {
    return this.repository.find();
  }
}
