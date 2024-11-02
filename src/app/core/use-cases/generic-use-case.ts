export interface IUseCase<I, O> {
  handle(data: I): Promise<O>
}
