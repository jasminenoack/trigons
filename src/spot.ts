import { Side } from "./side";

export class Spot {
    public right?: Side;
    public left?: Side;
    public flat?: Side;

    constructor(public up: boolean, public value?: number) { }
}
