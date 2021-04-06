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
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
} from 'typeorm';

export function parseFindManyParams<Entity extends ObjectLiteral>(
  queryParams: QueryParams<Entity>,
  searchableFields: (string & keyof Entity)[]
): FindManyOptions<Entity> {

  const filter: FindManyOptions<Entity> = {
    order: parseorderParams(queryParams.order?.split(',')),
    select: queryParams.fields?.split(','),
    relations: queryParams.relations?.split(','),
    skip: queryParams.page * queryParams.limit,
    take: queryParams.limit,
    where: parseSearchParam(searchableFields, queryParams.search, parseFilterParams(queryParams.filters?.split(','))),
  };

  return filter;
}

function parseorderParams<Entity extends ObjectLiteral>(
  orderParams
): { [P in keyof Entity]?: 'ASC' | 'DESC' } {
  const order = {};

  if (orderParams === undefined) {
    return undefined;
  }

  orderParams.forEach((value) => {
    const [key, direction] = value.split('||');
    order[key] = direction;
  });

  return order;
}

function parseSearchParam<Entity extends ObjectLiteral>(searchableFields: (string & keyof Entity)[], searchString?: string, filters?: FilterQuery<Entity>): FilterQuery<Entity> {
  if (searchString === undefined || '') {
    return filters;
  }

  const filter = [];

  searchableFields.forEach(fieldKey => {
    filter.push({[fieldKey]: ILike(`%${searchString}%`), ...filters});
  });

  return filter;
}

function parseFilterParams<Entity extends ObjectLiteral>(
  filterParams: string[]
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

      case 'lte':
        filter[key] = LessThanOrEqual(compareValue);
        break;

      case 'gte':
        filter[key] = MoreThanOrEqual(compareValue);
        break;

      case 'ncont':
        filter[key] =  Not(ILike(`%${compareValue}%`));
        break;

      default:
        filter[key] = compareValue;
    }
  });

  return filter;
}
