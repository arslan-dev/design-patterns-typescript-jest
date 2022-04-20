export default interface IIterator<Type> {
  get next(): Type | undefined
  hasMore(): boolean
}