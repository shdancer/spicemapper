import { Component } from './components/component';
export declare class Circuit {
    private components;
    private visited;
    private nodes;
    private nodeCount;
    private ground;
    constructor();
    add(comp: Component): void;
    delete(arg: string | Component): void;
    connect(compAName: string, compAIndex: number, compBName: string, compBIndex: number): void;
    disconnect(compAName: string, compAIndex: number, compBName: string, compBIndex: number): void;
    connectGround(compName: string | Component, compIndex: number): void;
    private rename;
    recount(): void;
    private convert;
    generate(): string;
}
