import { UnitType } from '../types';
import { Component } from './componentBase';
export declare class CircuitNode extends Component {
    constructor(name: string | number);
    get fullName(): string;
}
export declare class Ground extends CircuitNode {
    constructor();
}
export declare class Resistor extends Component {
    constructor(name: string | number, value: number, unit: UnitType);
}
export declare class VoltageSource extends Component {
    constructor(name: string | number, value: number, unit: UnitType);
}
