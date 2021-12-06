import { Circuit, Resistor, VoltageSource, UnitType } from '../index';

const cir = new Circuit();

cir.add(new Resistor(1, 100, UnitType.K));
cir.add(new VoltageSource(1, 10, UnitType.None));
cir.add(new Resistor(2, 1000, UnitType.None));

cir.connectGround('R1', 0);
cir.connectGround('V1', 1);
cir.connect('R1', 1, 'V1', 0);
cir.connect('R2', 1, 'R1', 1);
cir.connect('R2', 0, 'R1', 0);


console.log(cir.generateFormula());