export interface LibrarySystem<T> {
  addItem(element: T): void;
  getItem(index: number): T;
  removeItem(element: T): void;
  getNumberCollection():number;
}
