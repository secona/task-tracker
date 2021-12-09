export abstract class BasicDAO<T, TInsert = T, TUpdate = TInsert> {
  returnFields: Array<keyof T> | '*' = '*';
  abstract create(data: TInsert): Promise<T>;
  abstract get(id: any): Promise<T | undefined>;
  abstract update(id: any, data: TUpdate): Promise<T | undefined>;
  abstract del(id: any): Promise<number>;
}