"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const cir = new index_1.Circuit();
cir.add(new index_1.Resistor(1, 100, index_1.UnitType.K));
cir.add(new index_1.VoltageSource(1, 10, index_1.UnitType.None));
cir.add(new index_1.Resistor(2, 1000, index_1.UnitType.None));
cir.connectGround('R1', 0);
cir.connectGround('V1', 1);
cir.connect('R1', 1, 'V1', 0);
cir.connect('R2', 1, 'R1', 1);
cir.connect('R2', 0, 'R1', 0);
console.log(cir.generate());
//# sourceMappingURL=test.js.map