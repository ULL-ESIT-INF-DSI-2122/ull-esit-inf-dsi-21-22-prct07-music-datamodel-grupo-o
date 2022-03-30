export interface LiberySystem<T> {
  addItem(element: T): void;
  getItem(index: number): T;
  removeItem(index: number): T;
}


// XUE
export abstract class Libreria<T> implements LiberySystem<T>{
  constructor(parameters):T {

  }

  addItem(element: T): void {

  }

  getItem(index: number): T {

  }

  removeItem(index: number): T {
  }
}





