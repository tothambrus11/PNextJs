import { draggedPoint, mouse, p } from "./Main";
const pointSize = 20;
export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromTo(from, to) {
        return to.copy().sub(from);
    }
    add(xOrVector, y) {
        if (y === undefined) {
            if (!(xOrVector instanceof Vector2))
                throw new TypeError();
            this.x += xOrVector.x;
            this.y += xOrVector.y;
        }
        else {
            this.x += xOrVector;
            this.y += y;
        }
        return this;
    }
    sub(xOrVector, y) {
        if (y === undefined) {
            if (!(xOrVector instanceof Vector2))
                throw new TypeError();
            this.x -= xOrVector.x;
            this.y -= xOrVector.y;
        }
        else {
            this.x -= xOrVector;
            this.y -= y;
        }
        return this;
    }
    mult(otherOrScale, y) {
        if (otherOrScale instanceof Vector2) {
            return this.mult(otherOrScale.x, otherOrScale.y);
        }
        else if (isNaN(y)) {
            // Scalar multiplication
            this.x *= otherOrScale;
            this.y *= otherOrScale;
            return this;
        }
        else {
            // Scalar multiplication with given x and y coordinates
            this.x *= otherOrScale;
            this.y *= y;
            return this;
        }
    }
    div(a, b) {
        this.x /= a;
        if (!isNaN(b)) {
            this.y /= b;
        }
        else {
            this.y /= a;
        }
        return this;
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    static sub(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    /**
     * Dot product of given vectors
     * @param a
     * @param b
     */
    static mult(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    static avg(a, b, d1, d2) {
        if (!isNaN(d1) && !isNaN(d2)) {
            return Vector2.add(a.copy().mult(d2), b.copy().mult(d1)).div(d1 + d2);
        }
        return Vector2.add(a.copy(), b.copy()).div(2);
    }
    static dist(a, b) {
        return Vector2.fromTo(a, b).length;
    }
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    set length(length) {
        this.div(this.length / length);
    }
    /**
     * Creates a new object copy of the vector.
     */
    copy() {
        return new Vector2(this.x, this.y);
    }
    draw() {
        p.noStroke();
        if (Vector2.dist(this, mouse) <= pointSize / 2) {
            p.fill(10, 200, 200, 100);
            p.ellipse(this.x, this.y, pointSize, pointSize);
        }
        p.fill(255);
        p.circle(this.x, this.y, 10);
        if (p.mouseIsPressed && draggedPoint.p == null && Vector2.dist(this, mouse) <= pointSize / 2) {
            draggedPoint.p = this;
        }
        if (draggedPoint.p && draggedPoint.p == this) {
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
}
//# sourceMappingURL=Vector2.js.map