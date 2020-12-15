import p5 from "p5";
import { Line } from "./Line";
import { Vector2 } from "./Vector2";
import { LineSegment } from "./LineSegment";
let A;
let B;
let C;
export let draggedPoint = { p: null };
export let mouse = new Vector2(0, 0);
export let p = new p5((p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        A = new Vector2(0.2, 0.1).mult(p.width, p.height);
        B = new Vector2(0.15, 0.9).mult(p.width, p.height);
        C = new Vector2(0.85, 0.8).mult(p.width, p.height);
    };
    p.draw = () => {
        mouse.x = p.mouseX;
        mouse.y = p.mouseY;
        p.background(0);
        let AB = new LineSegment(A, B, "green", 3);
        let BC = new LineSegment(B, C, "red", 3);
        let AC = new LineSegment(A, C, "blue", 3);
        AB.draw();
        BC.draw();
        AC.draw();
        let S = sulypont(A, B, C);
        let M = magassagPont(A, B, C);
        p.noStroke();
        A.draw();
        B.draw();
        C.draw();
        S.draw();
        M.draw();
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.mouseReleased = () => {
        draggedPoint.p = null;
    };
});
function drawGrid(unit) {
    p.stroke(30);
    p.strokeWeight(1);
    for (let i = unit; i < p.width; i += unit) {
        p.line(i, 0, i, p.height);
    }
    for (let i = unit; i < p.height; i += unit) {
        p.line(0, i, p.width, i);
    }
}
function sulypont(A, B, C) {
    let AB = Vector2.fromTo(A, B);
    let lineAB = Line.createFromPointAndDirectionVector(A, AB);
    let BC = Vector2.fromTo(B, C);
    let lineBC = Line.createFromPointAndDirectionVector(B, BC);
    //let AC = Vector2.fromTo(A, C);
    //let lineAC = Line.createFromPointAndDirectionVector(A, AC);
    let F_a = Vector2.avg(B, C);
    let F_b = Vector2.avg(A, C);
    let F_c = Vector2.avg(A, B);
    let AF_a = Vector2.fromTo(A, F_a);
    let BF_b = Vector2.fromTo(B, F_b);
    //let CF_c = Vector2.fromTo(C, F_c);
    let S_a = Line.createFromPointAndDirectionVector(A, AF_a);
    let S_b = Line.createFromPointAndDirectionVector(B, BF_b);
    //let S_c = Line.createFromPointAndDirectionVector(C, CF_c);
    return Line.intersection(S_a, S_b);
}
function magassagPont(A, B, C) {
    let AB = Vector2.fromTo(A, B);
    let lineAB = Line.createFromPointAndDirectionVector(A, AB);
    let BC = Vector2.fromTo(B, C);
    let lineBC = Line.createFromPointAndDirectionVector(B, BC);
    let AC = Vector2.fromTo(A, C);
    let lineAC = Line.createFromPointAndDirectionVector(A, AC);
    let Am_a = Line.createFromPointAndNormalVector(A, BC);
    let Bm_b = Line.createFromPointAndNormalVector(B, AC);
    let Cm_c = Line.createFromPointAndNormalVector(C, AB);
    let M_a = Line.intersection(lineBC, Am_a);
    let M_b = Line.intersection(lineAC, Bm_b);
    let M_c = Line.intersection(lineAB, Cm_c);
    let M_a_segment = new LineSegment(A, M_a, "red");
    let M_b_segment = new LineSegment(B, M_b, "blue");
    let M_c_segment = new LineSegment(C, M_c, "green");
    M_a_segment.draw();
    M_b_segment.draw();
    M_c_segment.draw();
    M_a.draw();
    M_b.draw();
    M_c.draw();
    return new Vector2(0, 0);
}
//# sourceMappingURL=Main.js.map