"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitType = exports.ComponentType = void 0;
var ComponentType;
(function (ComponentType) {
    ComponentType["Resistor"] = "R";
    ComponentType["Capacor"] = "C";
    ComponentType["Inductor"] = "L";
    ComponentType["CurrentSource"] = "I";
    ComponentType["VoltageSource"] = "V";
    ComponentType["Node"] = "Node";
})(ComponentType || (ComponentType = {}));
exports.ComponentType = ComponentType;
var UnitType;
(function (UnitType) {
    UnitType["K"] = "K";
    UnitType["M"] = "M";
    UnitType["P"] = "P";
    UnitType["F"] = "F";
    UnitType["None"] = "";
})(UnitType || (UnitType = {}));
exports.UnitType = UnitType;
//# sourceMappingURL=types.js.map