import { p } from "./Main";
export class LineSegment {
    constructor(A, B, color, strokeWeight) {
        this.A = A;
        this.B = B;
        this.color = color;
        this.strokeWeight = strokeWeight;
        if (!color) {
            this.color = "#fff";
        }
        if (!strokeWeight) {
            this.strokeWeight = 1;
        }
    }
    draw() {
        p.stroke(this.color);
        p.strokeWeight(this.strokeWeight);
        p.line(this.A.x, this.A.y, this.B.x, this.B.y);
    }
}
//# sourceMappingURL=LineSegment.js.map