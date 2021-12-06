"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inductor = exports.Capacitor = exports.CurrentSource = exports.VoltageSource = exports.Resistor = exports.Ground = exports.CircuitNode = void 0;
const types_1 = require("../types");
const componentBase_1 = require("./componentBase");
class CircuitNode extends componentBase_1.Component {
    constructor(name) {
        super({
            type: types_1.ComponentType.Node,
            name: name,
            value: null,
            unit: null,
            maxDegree: Infinity,
        });
    }
    get fullName() {
        return this.name;
    }
}
exports.CircuitNode = CircuitNode;
class Ground extends CircuitNode {
    constructor() {
        super(0);
    }
}
exports.Ground = Ground;
class Resistor extends componentBase_1.Component {
    constructor(name, value, unit) {
        super({
            name: name,
            value: value,
            type: types_1.ComponentType.Resistor,
            unit: unit,
            maxDegree: 2,
        });
    }
}
exports.Resistor = Resistor;
class VoltageSource extends componentBase_1.Component {
    constructor(name, value, unit, acValue) {
        super({
            name: name,
            value: value,
            type: types_1.ComponentType.VoltageSource,
            unit: unit,
            maxDegree: 2,
            extra: `AC ${acValue}`
        });
    }
}
exports.VoltageSource = VoltageSource;
class CurrentSource extends componentBase_1.Component {
    constructor(name, value, unit, acValue) {
        super({
            name: name,
            value: value,
            type: types_1.ComponentType.CurrentSource,
            unit: unit,
            maxDegree: 2,
            extra: `AC ${acValue}`
        });
    }
}
exports.CurrentSource = CurrentSource;
class Capacitor extends componentBase_1.Component {
    constructor(name, value, unit) {
        super({
            name: name,
            value: value,
            type: types_1.ComponentType.Capacitor,
            unit: unit,
            maxDegree: 2
        });
    }
}
exports.Capacitor = Capacitor;
class Inductor extends componentBase_1.Component {
    constructor(name, value, unit) {
        super({
            name: name,
            value: value,
            type: types_1.ComponentType.Inductor,
            unit: unit,
            maxDegree: 2
        });
    }
}
exports.Inductor = Inductor;
//# sourceMappingURL=components.js.map