import {AbstractRepository, EntityRepository, FindManyOptions, ObjectLiteral} from 'typeorm';
import {UUID4} from '@system4blue/types';
import {PaginationResult} from '@system4blue/api-interfaces';
@EntityRepository()
export abstract class BasicRepository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {

  async create(entity: Entity): Promise<Entity> {
    return this.repository.save(this.repository.create(entity));
  }

  async getOneById(id: UUID4): Promise<Entity> {
    return this.repository.findOne(id);
  }

  async getByIdForReport(id: UUID4): Promise<Entity> {
    return this.repository.findOne(id, {relations: ['template', 'checker', 'responsible', 'checkResults', 'checkResults.item']});
  }

  async deleteOneById(id: UUID4): Promise<void> {
    this.repository.delete(id);
  }

  async updateOneById(id: UUID4, entity: Entity): Promise<void> {
    this.repository.update(id, entity);
  }

  async getMany(
    findManyOptions: FindManyOptions<Entity>
  ): Promise<PaginationResult<Entity>> {

    const total = await this.repository.count(findManyOptions);
    const data = await this.repository.find(findManyOptions);

    let pageTotal: number;
    let pageCount: number;

    if (findManyOptions.take === undefined || findManyOptions.take > total) {
      pageTotal = 1;

    } else {
      pageTotal = Math.ceil(total / findManyOptions.take);

    }

    if (!findManyOptions.skip) {
      pageCount = 0;

    } else {
      pageCount = Math.floor(total / findManyOptions.skip);

    }

    return {
      total,
      data,
      pageTotal,
      pageCount,
      count: data.length,
    };

  }
}
