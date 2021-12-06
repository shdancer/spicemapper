declare enum ComponentType {
    Resistor = "R",
    Capacor = "C",
    Inductor = "L",
    CurrentSource = "I",
    VoltageSource = "V",
    Node = "Node"
}
declare enum UnitType {
    K = "K",
    M = "M",
    P = "P",
    F = "F",
    None = ""
}
interface IComponent {
    type: ComponentType;
    name: string | number;
    value: number;
    unit: UnitType;
    maxDegree: number;
}
export { ComponentType, UnitType, IComponent };
