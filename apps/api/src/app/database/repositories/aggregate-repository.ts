export interface AggregateRepository<T, U> {
  create(data: U): Promise<U>
  findById(id: string): Promise<U>
  findAll(aggregateId: string): Promise<U[]>
  update(id: T, data: Partial<U>): Promise<void>
  delete(id: T): Promise<void>
}
