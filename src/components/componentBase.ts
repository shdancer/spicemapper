import { ComponentType, UnitType } from '../types';
import { IComponent } from '../types';

export class Component {
  public type: ComponentType;
  public name: string | number;
  public value: number;
  public unit: UnitType;
  public extra: string;
  private id: number;
  private static idCounter: number = 0;;

  public ports: Map<string | number, Component>;
  private portSize: number;

  get fullValue(): string {
    return this.value + this.unit;
  }

  get fullName(): string {
    return this.type + this.name;
  }

  get getId(): string {
    return String(this.id);
  }

  constructor(arg: IComponent) {
    this.type = arg.type;
    this.name = arg.name;
    this.value = arg.value;
    this.unit = arg.unit;
    this.ports = new Map<string | number, Component>();
    this.id = Component.idCounter++;
  }

  toString(port: [number, number]): string {
    return `${this.type}${this.name} ${port[0]} ${port[1]} ${this.fullValue} ${this.extra || ''}`
  }
}