import { Vector } from "matter-js";
import p5 from "p5"

export function displayVec(p: p5, pos: Vector, vec: Vector, scale: number = 1, color: string = 'white', strokeWeight: number = 5, arrowSize: number = 7, normalized: boolean = false, minSize: number = 5) {
    // This function is specificially for displaying matter.js vectors.
    if (Vector.magnitude(vec) * scale > minSize) {
        p.push()
        p.stroke(color)
        p.strokeWeight(strokeWeight)
        p.fill(color)

        let normScale = 20 * scale;

        if (normalized) {
            let vec_n = Vector.normalise(vec);
            drawArrow(p, pos, vec_n, normScale, arrowSize)
        }
        
        else {
            drawArrow(p, pos, vec, scale, arrowSize)
        }

        p.pop()
    }
}

function drawArrow(p: p5, pos: Vector, vec: Vector, scale: number = 1, arrowSize: number = 7) {
    p.translate(pos.x, pos.y);
    p.line(0, 0, scale * vec.x, scale * vec.y);
    let i_hat = Vector.create(0, 0)
    let angle = Vector.angle(vec, i_hat)
    p.rotate(p.PI + angle);
    p.translate(scale * Vector.magnitude(vec) - arrowSize, 0);
    p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
}