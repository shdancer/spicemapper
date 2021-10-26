import { ComponentType, UnitType } from '../types';
import { IComponent } from '../types';
export declare class Component {
    type: ComponentType;
    name: string | number;
    value: number;
    unit: UnitType;
    private id;
    private static idCounter;
    ports: Map<string | number, Component>;
    private portSize;
    get fullValue(): string;
    get fullName(): string;
    get getId(): string;
    constructor(arg: IComponent);
    toString(port: [number, number]): string;
}
