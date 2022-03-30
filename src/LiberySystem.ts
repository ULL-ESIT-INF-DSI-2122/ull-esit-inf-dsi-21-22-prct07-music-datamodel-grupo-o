export interface LiberySystem<T> {
  addItem(element: T): void;
  getItem(index: number): T;
  removeItem(index: number): T;
}