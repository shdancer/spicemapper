import { Circuit, Resistor, VoltageSource, UnitType, Capacitor } from '../index';

const cir = new Circuit();

cir.add(new Resistor(1, 100, UnitType.K));
cir.add(new Resistor(2, 1000, UnitType.None));
cir.add(new Resistor(3, 1000, UnitType.None));
cir.add(new Resistor(4, 1000, UnitType.None));
cir.add(new Capacitor(1, 20, UnitType.F));
cir.add(new VoltageSource(1, 10, UnitType.None));

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