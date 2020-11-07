import { Vector } from "p5";
var clone = require('../node_modules/lodash/clone')

export class Mover {
    public mass: number;
    public size: number;
    public position: any;
    public velocity: any;
    public acceleration: any;

    // movers contain the object used to render themselves.
    private p: any;

    constructor(m: number, x: number, y: number, v: number, theta: number, size: number, p: any) {
        this.mass = m;
        this.size = size;
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(v * p.cos(theta), v * p.sin(theta));
        this.acceleration = p.createVector(0, 0);
        this.p = p;
    }

    display(x_pos: Number, y_pos: Number) {
        this.p.stroke(0);
        this.p.fill(255, 127);
        this.p.ellipse(x_pos, y_pos, this.size, this.size);
    };

    calculate_Force(force: Vector) {
        let a = clone(force)
        a = a.div(this.mass);
        return a;
    };

    update(dt: number) {
        // Velocity changes according to acceleration
        let a = clone(this.acceleration)
        let v_i = clone(this.velocity)
        let v_f = clone(this.velocity)
        let p_f = clone(this.position)

        v_f = v_f.add(a.mult(dt));
        // position changes by velocity
        p_f = p_f.add(v_i.mult(dt));

        return [p_f, v_f]
    };

    // Bounce off bottom of window
    checkEdges(height: number) {

        let position = clone(this.position);
        let velocity = clone(this.velocity);
        let acceleration = clone(this.acceleration);

        if (this.position.y > (height - this.size / 2)) {
            // A little dampening when hitting the bottom
            velocity.y *= -0.2;
            velocity.x *= 0;
            position.y = (height - this.size / 2);
            acceleration.y *= -0.2;
        }

        return [position, velocity, acceleration]
    };

}