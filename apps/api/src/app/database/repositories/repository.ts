export interface Repository<T, U> {
  create(data: U): Promise<U>
  findById(id: string): Promise<U>
  findAll(): Promise<U[]>
  update(id: T, data: Partial<U>): Promise<void>
  delete(id: T): Promise<void>
}
