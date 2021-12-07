"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const cir = new index_1.Circuit();
cir.add(new index_1.Resistor(1, 100, index_1.UnitType.K));
cir.add(new index_1.Resistor(2, 1000, index_1.UnitType.None));
cir.add(new index_1.Resistor(3, 1000, index_1.UnitType.None));
cir.add(new index_1.Resistor(4, 1000, index_1.UnitType.None));
cir.add(new index_1.Capacitor(1, 20, index_1.UnitType.F));
cir.add(new index_1.VoltageSource(1, 10, index_1.UnitType.None));
cir.connectGround('R1', 1);
cir.connectGround('R3', 1);
cir.connectGround('V1', 1);
cir.connect('R1', 0, 'R2', 1);
cir.connect('R3', 0, 'R4', 1);
cir.connect('R2', 0, 'R4', 0);
cir.connect('R4', 0, 'V1', 0);
cir.connect('C1', 0, 'R1', 0);
cir.connect('C1', 1, 'R4', 1);
console.log(cir.generateFormula());
console.log(cir.generate());
//# sourceMappingURL=test.js.map