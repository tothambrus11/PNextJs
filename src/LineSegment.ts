import {Vector2} from "./Vector2";
import {p} from "./Main";

export class LineSegment{
    constructor(public A: Vector2, public B: Vector2, private readonly color?: string, private strokeWeight?: number) {
        if(!color){
            this.color = "#fff";
        }
        if(!strokeWeight){
            this.strokeWeight = 1;
        }
    }

    draw(){
        p.stroke(this.color);
        p.strokeWeight(this.strokeWeight);
        p.line(this.A.x, this.A.y, this.B.x, this.B.y);
    }
}