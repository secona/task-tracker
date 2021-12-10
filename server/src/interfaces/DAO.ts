export abstract class BasicDAO<T, TInsert = T, TUpdate = TInsert> {
  returnFields: Array<keyof T> | '*' = '*';
  abstract create(data: TInsert): Promise<T>;
  abstract get(where: Partial<T>): Promise<T | undefined>;
  abstract update(where: Partial<T>, data: TUpdate): Promise<T | undefined>;
  abstract del(where: Partial<T>): Promise<number>;
}
