import {Vector, Constraint, Composite, Body, Bodies} from 'matter-js'
import { displayVec } from '../../displayVec';
import { Simulation } from "../Simulation";
import { Color } from 'p5';
import { clone } from 'mathjs';
import * as func from '../../Function';
import { dataContainer } from '../../dataContainer';

class simData extends dataContainer {
    time = Array<number>();
    position =Array<Matter.Vector>();
    theta = Array<number>();
    velocity = Array<Matter.Vector>();
    acceleration = Array<Matter.Vector>();
}

export class SemicircleSim extends Simulation {
    radius1 = 10;
    radius2 = 200;
    circle?: any; 
    circle1?: any; 
    composite?: any;
    constraint?: any;
    toggles: object;
    data = new simData()

    constructor(h: number) {
        super(h)
        this.toggles = {
            velocity: false,
            normal_f: false,
            gravity: false,
            gravity_r: false,
            gravity_t: false,
            acc_c: false
        }
    }

    setup = () => {
        let c1_options = {friction: 0, frictionAir: 0, mass: 1};
        let c2_options = {friction: 0, frictionAir: 0, isStatic: true}
        this.circle = Bodies.polygon(this.width/2, this.height - this.radius2 - this.radius1, 50, this.radius1, c1_options);
        this.circle1 = Bodies.polygon(this.width/2, this.height, 50, this.radius2, c2_options);
        this.composite = Composite.create();
        this.world.gravity.y = 0.588;
        let options = {bodyA: this.circle, bodyB: this.circle1, stiffness: 1};
        this.constraint = Constraint.create(options)
        Composite.add(this.composite, this.constraint)
        Body.setVelocity(this.circle, Vector.create(0.01, 0))
        this.object_array = [this.circle,  this.circle1, this.composite]
    }

    display = () => {
        if (this.counter < this.data.length) {
            this.p.background(50);
            this.p.fill(this.p.color('rgb(255,240,240)'))
            this.p.circle(this.data.position[this.counter].x, this.data.position[this.counter].y, 2 * this.radius1)
            this.p.fill(this.p.color('rgb(63,224,208)'))
            this.p.circle(this.circle1.position?.x, this.circle1.position?.y, 2*this.radius2)
            this.vecDisplay(this.counter)
        }
    }

    vecDisplay = (c) => {
        let r = Vector.sub(this.data.position[c], this.circle1.position)
        let r_n = Vector.normalise(r);
        let v_n = Vector.perp(r_n, true)
        let g = Vector.create(0, 9.8)
        let g_r  = Vector.mult(r_n, Vector.dot(r_n, g))
        let g_t = Vector.mult(v_n, Vector.dot(v_n, this.data.acceleration[c]))
        let a_r = Vector.mult(r_n, Vector.dot(r_n, this.data.acceleration[c]))
        let a_c = Vector.mult(r_n, -(Vector.magnitudeSquared(this.data.velocity[c]) / 3.7))
        let n = Vector.sub(a_r, g_r)

        if (this.toggles['velocity']) {
            displayVec(this.p, this.data.position[c], this.data.velocity[c], 6, 'rgb(115,194,251)')
        }

        if (this.toggles['normal_f']) {
            displayVec(this.p, this.data.position[c], n, 6, 'orange')
        }

        if (this.toggles['gravity']) {
            displayVec(this.p, this.data.position[c], g, 6, 'rgb(0,180,50)');
        }
            //displayVec(this.p, this.data[c][1], g, 6, 'black');
            // displayVec(this.p, this.circle1.position, r, 1, 'red');
        if (this.toggles['gravity_r']) {
            displayVec(this.p, this.data.position[c], g_r, 6, 'red');
        }

        if (this.toggles['gravity_t']) {
            displayVec(this.p, this.data.position[c], g_t, 6, 'yellow');
        }

        if (this.toggles['acc_c']) {
            displayVec(this.p, this.data.position[c], a_c, 6, 'purple');
        }
    }

     recompute = () => {
        var velocity = clone(this.data['velocity'])
        var acceleration = func.derivative(velocity, this.timestep)
        this.data['acceleration'] = acceleration;
    }

    store = (iteration) => {
        let time = this.timestep * iteration
        let position = Vector.clone(this.circle.position)
        let r = Vector.sub(this.circle.position, this.circle1.position)
        let angle = Vector.angle(Vector.create(1, 0), r)
        let velocity = Vector.clone(this.circle.velocity)
        this.data.time.push(time)
        this.data.position.push(position)
        this.data.velocity.push(velocity)
        this.data.theta.push(angle)
        this.data.length += 1
    }

    postProcess = () => {
        this.trim(2, 2)
    }

    stopCondition = () => {
        if (this.circle.position.y >= this.height) {
            return true
        }

        return false
    }

    postUpdate = (iteration) => {
        if (this.data.theta[iteration] >= -0.73) {
            Composite.remove(this.composite, this.constraint, true)
        }
    }
}