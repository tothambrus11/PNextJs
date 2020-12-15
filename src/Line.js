import { Vector2 } from "./Vector2";
import { p } from "./Main";
export class Line {
    constructor(A, B, C, P) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.P = P;
    }
    static createFromPointAndNormalVector(P, n) {
        const A = n.x;
        const B = n.y;
        const C = P.x * A + P.y * B;
        return new Line(A, B, C, P);
    }
    static createFromPointAndDirectionVector(P, v) {
        const A = v.y;
        const B = -v.x;
        const C = P.x * A + P.y * B;
        return new Line(A, B, C, P);
    }
    static intersection(l1, l2) {
        let x, y;
        if (l1.B == 0) {
            x = l1.getVerticalLineX();
            y = l2.yAt(x);
            if (isNaN(y) || !isFinite(y))
                return null;
            return new Vector2(x, y);
        }
        if (l2.B == 0) {
            x = l2.getVerticalLineX();
            y = l1.yAt(x);
            if (isNaN(y) || !isFinite(y))
                return null;
            return new Vector2(x, y);
        }
        x = (l1.C * l2.B - l2.C * l1.B) / (l1.A * l2.B - l2.A * l1.B);
        y = (l1.C * l2.B - l1.A * x * l2.B) / (l1.B * l2.B);
        if (!isFinite(x) || !isFinite(y))
            return null;
        return new Vector2(x, y);
    }
    yAt(x) {
        if (this.B == 0)
            return NaN;
        return (this.C - this.A * x) / this.B;
    }
    getVerticalLineX() {
        return this.P.x;
    }
    draw() {
        const A = this.yAt(0);
        const B = this.yAt(p.width);
        if (isNaN(A) || !isFinite(A)) {
            p.line(this.getVerticalLineX(), 0, this.getVerticalLineX(), p.height);
        }
        else {
            p.line(0, A, p.width, B);
        }
    }
}
//# sourceMappingURL=Line.js.map