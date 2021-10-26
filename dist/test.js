"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circuit_1 = require("./circuit");
const detailedComponent_1 = require("./components/detailedComponent");
const types_1 = require("./types");
const cir = new circuit_1.Circuit();
cir.add(new detailedComponent_1.Resistor(1, 100, types_1.UnitType.K));
cir.add(new detailedComponent_1.VoltageSource(1, 10, types_1.UnitType.None));
cir.add(new detailedComponent_1.Resistor(2, 1000, types_1.UnitType.None));
cir.connectGround('R1', 0);
cir.connectGround('V1', 1);
cir.connect('R1', 1, 'V1', 0);
cir.connect('R2', 1, 'R1', 1);
cir.connect('R2', 0, 'R1', 0);
console.log(cir.generate());
//# sourceMappingURL=test.js.map