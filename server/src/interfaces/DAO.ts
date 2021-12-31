export abstract class BasicDAO<T, TInsert = T, TUpdate = TInsert> {
  abstract returnFields: Array<keyof T>;
  abstract create(data: TInsert): Promise<T>;
  abstract getOne(where: Partial<T>): Promise<T | undefined>;
  abstract getMany(where: Partial<T>): Promise<T[] | undefined>;
  abstract update(where: Partial<T>, data: TUpdate): Promise<T | undefined>;
  abstract del(where: Partial<T>): Promise<number>;
}
