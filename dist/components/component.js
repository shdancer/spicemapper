"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(arg) {
        this.type = arg.type;
        this.name = arg.name;
        this.value = arg.value;
        this.unit = arg.unit;
        this.ports = new Map();
        this.id = Component.idCounter++;
    }
    ;
    get fullValue() {
        return this.value + this.unit;
    }
    get fullName() {
        return this.type + this.name;
    }
    get getId() {
        return String(this.id);
    }
    toString(port) {
        return `${this.type}${this.name} ${port[0]} ${port[1]} ${this.fullValue}`;
    }
}
exports.Component = Component;
Component.idCounter = 0;
//# sourceMappingURL=component.js.map