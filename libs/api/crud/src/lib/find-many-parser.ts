import {
  QueryParams,
  FilterCondition,
} from '@system4blue/api-interfaces';
import {
  Equal,
  FilterQuery,
  FindManyOptions,
  ILike,
  LessThan,
  MoreThan,
  Not,
  ObjectLiteral,
} from 'typeorm';

export function parseFindManyParams<Entity extends ObjectLiteral>(
  queryParams: QueryParams<Entity>
): FindManyOptions<Entity> {

  const filter: FindManyOptions<Entity> = {
    order: parseorderParams(queryParams.order?.split(',')),
    select: queryParams.fields?.split(','),
    relations: queryParams.relations?.split(','),
    skip: queryParams.page * queryParams.limit,
    take: queryParams.limit,
    where: parseFilterParams(queryParams.filter?.split(',')),
  };

  return filter;
}

function parseorderParams<Entity extends ObjectLiteral>(
  orderParams
): { [P in keyof Entity]?: 'ASC' | 'DESC' } {
  const order: Record<keyof Entity, 'ASC' | 'DESC'> = {};

  if (orderParams === undefined) {
    return undefined;
  }

  orderParams.forEach((value) => {
    const [key, direction] = value.split('||');
    order[key] = direction;
  });

  return order;
}

function parseFilterParams<Entity extends ObjectLiteral>(
  filterParams
): FilterQuery<Entity> {
  const filter = {};

  if (filterParams === undefined) {
    return undefined;
  }

  filterParams.forEach((value) => {
    const [key, condition, compareValue] = value.split('||');

    switch (condition as FilterCondition) {
      case 'eq':
        filter[key] = Equal(compareValue);
        break;

      case 'ne':
        filter[key] = Not(Equal(compareValue));
        break;

      case 'starts':
        filter[key] = ILike(`${compareValue}%`);
        break;

      case 'ends':
        filter[key] = ILike(`%${compareValue}`);
        break;

      case 'cont':
        filter[key] = ILike(`%${compareValue}%`);
        break;

      case 'gt':
        filter[key] = MoreThan(compareValue);
        break;

      case 'lt':
        filter[key] = LessThan(compareValue);
        break;

      default:
        filter[key] = compareValue;
    }
  });

  return filter;
}
