import { ComponentType, UnitType } from '../types';
import { Component } from './componentBase';

export class CircuitNode extends Component {
  constructor(name: string | number) {
    super({
      type: ComponentType.Node,
      name: name,
      value: null,
      unit: null,
      maxDegree: Infinity,
    });
  }

  override get fullName() {
    return this.name as string;
  }
}

export class Ground extends CircuitNode {
  constructor() {
    super(0);
  }
}

export class Resistor extends Component {
  public constructor(name: string | number, value: number, unit: UnitType) {
    super({
      name: name,
      value: value,
      type: ComponentType.Resistor,
      unit: unit,
      maxDegree: 2,
    })
  }
}

export class VoltageSource extends Component {
  public constructor(name: string | number, value: number, unit: UnitType, acValue?: number) {
    super({
      name: name,
      value: value,
      type: ComponentType.VoltageSource,
      unit: unit,
      maxDegree: 2,
      extra: `AC ${acValue}`
    });
  }
}

export class CurrentSource extends Component {
  public constructor(name: string | number, value: number, unit: UnitType, acValue?: number) {
    super({
      name: name,
      value: value,
      type: ComponentType.CurrentSource,
      unit: unit,
      maxDegree: 2,
      extra: `AC ${acValue}`
    });
  }
}

export class Capacitor extends Component {
  public constructor(name: string | number, value: number, unit: UnitType) {
    super({
      name: name,
      value: value,
      type: ComponentType.Capacitor,
      unit: unit,
      maxDegree: 2
    });
  }
}

export class Inductor extends Component {
  public constructor(name: string | number, value: number, unit: UnitType) {
    super({
      name: name,
      value: value,
      type: ComponentType.Inductor,
      unit: unit,
      maxDegree: 2
    });
  }
}