import {draggedPoint, mouse, p} from "./Main";

const pointSize = 20;

export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromTo(from: Vector2, to: Vector2) {
        return to.copy().sub(from);
    }

    add(other: Vector2): Vector2;
    add(x: number, y: number): Vector2;

    add(xOrVector: any, y?: any): Vector2 {
        if (y === undefined) {
            if (!(xOrVector instanceof Vector2)) throw new TypeError();
            this.x += xOrVector.x;
            this.y += xOrVector.y;
        } else {
            this.x += xOrVector;
            this.y += y;
        }
        return this;
    }

    sub(x: number, y: number): Vector2;
    sub(other: Vector2): Vector2;

    sub(xOrVector: any, y?: any): Vector2 {
        if (y === undefined) {
            if (!(xOrVector instanceof Vector2)) throw new TypeError();
            this.x -= xOrVector.x;
            this.y -= xOrVector.y;
        } else {
            this.x -= xOrVector;
            this.y -= y;
        }
        return this;
    }

    /**
     * Scalar multiplication
     * @param scale a number to multiply the vector with
     */
    mult(scale: number): Vector2;
    /**
     * Dot product / scalar product
     * @param other A vector to multiply with
     */
    mult(other: Vector2): number;
    /**
     * Scalar multiplication X Y
     * @param x the x coordinate of the other vector
     * @param y the y coordinate of the other vector
     */
    mult(x: number, y: number): Vector2;

    mult(otherOrScale: any, y?: any): any {
        if (otherOrScale instanceof Vector2) {
            return this.mult(otherOrScale.x, otherOrScale.y);
        } else if (isNaN(y)) {
            // Scalar multiplication
            this.x *= otherOrScale;
            this.y *= otherOrScale;
            return this;
        } else {
            // Scalar multiplication with given x and y coordinates
            this.x *= otherOrScale;
            this.y *= y;
            return this;
        }
    }

    div(divider: number): Vector2;
    div(x: number, y: number): Vector2;
    div(a: number, b?: number): Vector2 {
        this.x /= a;
        if (!isNaN(b)) {
            this.y /= b;
        } else {
            this.y /= a;
        }
        return this;
    }

    static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static sub(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /**
     * Dot product of given vectors
     * @param a
     * @param b
     */
    static mult(a: Vector2, b: Vector2) {
        return a.x * b.x + a.y * b.y;
    }

    static avg(a: Vector2, b: Vector2, w1: number, w2: number): Vector2;
    static avg(a: Vector2, b: Vector2): Vector2;

    static avg(a: Vector2, b: Vector2, d1?: any, d2?: any): Vector2 {
        if (!isNaN(d1) && !isNaN(d2)) {
            return Vector2.add(
                a.copy().mult(d2),
                b.copy().mult(d1)
            ).div(d1 + d2);
        }
        return Vector2.add(a.copy(), b.copy()).div(2);
    }

    static dist(a: Vector2, b: Vector2) {
        return Vector2.fromTo(a, b).length;
    }

    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    set length(length: number) {
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

        if (Vector2.dist(this, mouse) <= pointSize/2) {
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
