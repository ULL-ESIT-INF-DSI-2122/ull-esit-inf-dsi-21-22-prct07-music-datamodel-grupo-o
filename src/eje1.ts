type ColorType = 'red' | 'yellow' | 'blue' | 'green';

/**
 * This class declares an abstract factory method (or a default factory
 * method) that returns a TwoDimensionalFigure object. Subclasses may
 * provide a particular implementation of this method.
 */
abstract class TwoDimensionalFigureCreator {
  public abstract factoryMethod(): TwoDimensionalFigure;
  /**
   * Logic that relies on TwoDimensionalFigure objects returned by
   * the factory method. Subclasses can change this logic indirectly
   * by overriding the factory method and returning a different
   * TwoDimensionalFigure object.
   */
  public logic(): string {
    const twoDimensionalFigure = this.factoryMethod();
    return `I am a ${twoDimensionalFigure.getName()}, ` +
           `I am ${twoDimensionalFigure.getColor()} and ` +
           `my area is equal to ${twoDimensionalFigure.getArea()}`;
  }
}

/**
 * Concrete implementation of the class TwoDimensionalFigureCreator that
 * returns Rectangle objects through the factory method. It can be observed
 * how the concrete implementation of the factory method still returns
 * a TwoDimensionalFigure object, which is an abstract type
 */
class RectangleCreator extends TwoDimensionalFigureCreator {
  constructor(private readonly name: string, private color: ColorType,
    private base: number, private height: number) {
    super();
  }
  public factoryMethod(): TwoDimensionalFigure {
    return new Rectangle(this.name, this.color, this.base, this.height);
  }
}

/**
 * Concrete implementation of the class TwoDimensionalFigureCreator that
 * returns Circle objects through the factory method. It can be observed
 * how the concrete implementation of the factory method still returns
 * a TwoDimensionalFigure object, which is an abstract type
 */
class CircleCreator extends TwoDimensionalFigureCreator {
  constructor(private readonly name: string, private color: ColorType,
    private radius: number) {
    super();
  }
  public factoryMethod(): TwoDimensionalFigure {
    return new Circle(this.name, this.color, this.radius);
  }
}

/**
 * Interface that declares all the common functionality that concrete
 * TwoDimensionalFigure objects have to implement
 */
interface TwoDimensionalFigure {
  getName(): string;
  getColor(): ColorType;
  getArea(): number;
}

/**
 * Class that provides a concrete implementation of a TwoDimensionalFigure object
 */
class Rectangle implements TwoDimensionalFigure {
  private readonly sides = 4;

  constructor(private readonly name: string, private color: ColorType,
    private base: number = 1, private height: number = 1) {
  }

  getSides() {
    return this.sides;
  }
  getName() {
    return this.name;
  }
  getColor() {
    return this.color;
  }
  getBase() {
    return this.base;
  }
  getHeight() {
    return this.height;
  }

  setColor(color: ColorType) {
    this.color = color;
  }
  setBase(base: number) {
    this.base = base;
  }
  setHeight(height: number) {
    this.height = height;
  }

  getArea() {
    return this.base * this.height;
  }
}

/**
 * Class that provides a concrete implementation of a TwoDimensionalFigure object
 */
class Circle implements TwoDimensionalFigure {
  constructor(private readonly name: string, private color: ColorType,
    private radius: number = 1) {
  }

  getName() {
    return this.name;
  }
  getColor() {
    return this.color;
  }
  getRadius() {
    return this.radius;
  }

  setColor(color: ColorType) {
    this.color = color;
  }
  setRadius(radius: number) {
    this.radius = radius;
  }

  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

/**
 * Client code that works with an instance of a concrete creator through its
 * common superclass TwoDimensionalFigureCreator.
 */
function clientCode(twoDimensionalFigureCreator: TwoDimensionalFigureCreator) {
  console.log(twoDimensionalFigureCreator.logic());
}

clientCode(new RectangleCreator('RedRectangle', 'red', 10, 5));
clientCode(new CircleCreator('BlueCircle', 'blue', 7));