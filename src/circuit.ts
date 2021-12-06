import { Component } from './components/componentBase';
import { CircuitNode, Ground } from './components/components'
import { ComponentType } from './types';

type term = {
  positive: boolean,
  term: string
};

type formula = {
  left: term[],
  right: term[]
};

export class Circuit {
  private components: Map<string, Component>;
  private visited: Set<string>;
  private nodes: CircuitNode[];
  private nodeCount = 1;
  private ground: Ground;
  constructor() {
    this.components = new Map<string, Component>();
    this.visited = new Set<string>();
    this.nodes = new Array<CircuitNode>();
    this.ground = new Ground();
    this.nodes.push(this.ground);
  }

  add(comp: Component): void {
    this.components.set(comp.fullName, comp);
  }

  delete(arg: string | Component): void {
    let comp: Component;
    if (typeof arg === "string")
      comp = this.components.get(arg);
    else
      comp = this.components.get(arg.fullName);

    for (const [_, cComp] of comp.ports) {
      cComp.ports.delete(comp.fullName);
    }

    this.components.delete(comp.fullName);
  }

  connect(compAName: string, compAIndex: number, compBName: string, compBIndex: number): void {
    const compA = this.components.get(compAName), compB = this.components.get(compBName);
    if (!compA.ports.get(compAIndex)) {
      const node = new CircuitNode(this.nodeCount++);
      this.nodes.push(node)
      compA.ports.set(compAIndex, node);
      node.ports.set(compA.fullName, compA);
    }
    if (!compB.ports.get(compBIndex)) {
      const node = new CircuitNode(this.nodeCount++);
      this.nodes.push(node);
      compB.ports.set(compBIndex, node);
      node.ports.set(compB.fullName, compB);
    }
    const nodeA = compA.ports.get(compAIndex), nodeB = compB.ports.get(compBIndex);
    nodeA.ports.set(nodeB.fullName, nodeB);
    nodeB.ports.set(nodeA.fullName, nodeA);
  }

  disconnect(compAName: string, compAIndex: number, compBName: string, compBIndex: number): void {
    const compA = this.components.get(compAName), compB = this.components.get(compBName);
    const nodeA = compA.ports.get(compAIndex), nodeB = compB.ports.get(compBIndex);
    nodeA.ports.delete(nodeB.fullName);
    nodeB.ports.delete(nodeA.fullName);
  }

  connectGround(compName: string | Component, compIndex: number) {
    if (typeof compName !== 'string') {
      compName = compName.fullName;
    }
    const comp = this.components.get(compName);

    const ground = this.nodes[0];
    ground.ports.set(compName, comp);
    comp.ports.set(compIndex, ground);
  }

  private rename(node: CircuitNode, name: number) {
    if (this.visited.has(node.getId))
      return;
    this.visited.add(node.getId)
    node.name = name;
    for (const [_, nextNode] of node.ports) {
      if (nextNode.type === ComponentType.Node) {
        this.rename(nextNode, name);
      }
    }
  }

  public recount() {
    this.visited.clear();
    this.nodeCount = 0;
    for (const node of this.nodes) {
      if (node.name < this.nodeCount)
        continue;
      this.rename(node, this.nodeCount++);
    }
  }

  private convert(node: Component = this.nodes[0]): string {
    if (this.visited.has(node.getId))
      return '';
    this.visited.add(node.getId);

    let res = '';
    if (node.type !== ComponentType.Node)
      res += node.toString([node.ports.get(0).fullName as any, node.ports.get(1).fullName as any]) + '\n';
    for (const [_, nextNode] of node.ports) {
      res += this.convert(nextNode);
    }
    return res;
  }

  private convertFormula(node: Component = this.nodes[0], formulas: formula[]): void {
    if (this.visited.has(node.getId))
      return;
    this.visited.add(node.getId);

    if (node.type !== ComponentType.Node) {
      switch (node.type) {
        case ComponentType.CurrentSource:
        case ComponentType.VoltageSource:
          formulas[node.ports.get(0).fullName].right.push({
            positive: false,
            term: `I_{${node.fullName}}`
          });
          formulas[node.ports.get(1).fullName].right.push({
            positive: true,
            term: `I_{${node.fullName}}`
          });
          break;
        case ComponentType.Resistor:
          formulas[node.ports.get(0).fullName].left.push({
            positive: true,
            term: `\\frac{1}{${node.fullName}}U_{n${node.ports.get(0).fullName}}`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: true,
            term: `\\frac{1}{${node.fullName}}U_{n${node.ports.get(1).fullName}}`
          });
          formulas[node.ports.get(0).fullName].left.push({
            positive: false,
            term: `\\frac{1}{${node.fullName}}U_{n${node.ports.get(1).fullName}}`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: false,
            term: `\\frac{1}{${node.fullName}}U_{n${node.ports.get(0).fullName}}`
          });
          break;
        case ComponentType.Capacitor:
          formulas[node.ports.get(0).fullName].left.push({
            positive: true,
            term: `${node.fullName}\\frac{dU_{n${node.ports.get(0).fullName}}}{dt}`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: true,
            term: `${node.fullName}\\frac{dU_{n${node.ports.get(1).fullName}}}{dt}`
          });
          formulas[node.ports.get(0).fullName].left.push({
            positive: false,
            term: `${node.fullName}\\frac{dU_{n${node.ports.get(1).fullName}}}{dt}`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: false,
            term: `${node.fullName}\\frac{dU_{n${node.ports.get(0).fullName}}}{dt}`
          });
          break;
        case ComponentType.Inductor:
          formulas[node.ports.get(0).fullName].left.push({
            positive: true,
            term: `\\${node.fullName}int_{t_0}^{t}U_{n${node.ports.get(0).fullName}}dt`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: true,
            term: `\\${node.fullName}int_{t_0}^{t}U_{n${node.ports.get(1).fullName}}dt`
          });
          formulas[node.ports.get(0).fullName].left.push({
            positive: false,
            term: `\\${node.fullName}int_{t_0}^{t}U_{n${node.ports.get(1).fullName}}dt`
          });
          formulas[node.ports.get(1).fullName].left.push({
            positive: false,
            term: `\\${node.fullName}int_{t_0}^{t}U_{n${node.ports.get(0).fullName}}dt`
          });

          break;
      }
    }
    for (const [_, nextNode] of node.ports) {
      this.convertFormula(nextNode, formulas);
    }
  }

  public generate(): string {
    this.recount();
    this.visited.clear();
    return this.convert();
  }

  public generateFormula(): string {
    this.recount();
    this.visited.clear();
    const formulas: formula[] = new Array<formula>();
    while (formulas.length !== this.nodeCount) {
      formulas.push({
        left: new Array<term>(),
        right: new Array<term>()
      });
    }
    this.convertFormula(this.nodes[0], formulas);

    let res = '';

    for (const index in formulas) {
      if (index === '0') {
        continue;
      }
      const formula = formulas[index];
      const { left, right } = formula;
      let tempRes = '';

      for (const index in left) {
        if (left[index].term.includes('U_{n0}'))
          continue;
        if (index === '0') {
          tempRes += `${left[index].positive ? '' : '-'}${left[index].term}`;
          continue;
        }
        tempRes += `${left[index].positive ? '+' : '-'}${left[index].term}`;
      }
      tempRes += '=';
      for (const index in right) {
        if (index === '0') {
          tempRes += `${right[index].positive ? '' : '-'}${right[index].term}`;
          continue;
        }
        tempRes += `${right[index].positive ? '+' : '-'}${right[index].term}`;
      }
      if (right.length === 0) {
        tempRes += 0;
      }
      res += (tempRes + '\\\\ \n');
    }

    return res;
  }
}