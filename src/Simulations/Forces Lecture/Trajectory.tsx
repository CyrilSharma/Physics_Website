import {Vector, Composite, Body, Bodies} from 'matter-js'
import { displayVec } from '../../displayVec';
import { Simulation } from "../Simulation";
import { Color } from 'p5';
import { clone } from 'mathjs';
import * as func from '../../Function';
import { dataContainer } from '../../dataContainer';

class simData extends dataContainer {
    time = Array<number>();
    position =Array<Matter.Vector>();
    velocity = Array<Matter.Vector>();
    acceleration = Array<Matter.Vector>();
}

export class TrajectorySim extends Simulation {
    radius1 = 20;
    circle?: any; 
    c1?: Color;
    composite?: any;
    constraint?: any;
    toggles: object;
    data = new simData()

    constructor(h: number) {
        super(h)
        this.toggles = {
            velocity: false,
            velocity_i: false,
            velocity_j: false,
            gravity: false
        }
    }

    setup = () => {
        this.c1 = this.p.color('rgb(255, 205, 2)')
        let c1_options = {friction: 0, frictionAir: 0, mass: 1};
        this.circle = Bodies.polygon(this.width/4, this.height - this.radius1, 50, this.radius1, c1_options);
        this.composite = Composite.create();
        this.constraint = undefined;
        this.world.gravity.y = 0.588;
        Body.setVelocity(this.circle, Vector.create(5, -10))
        this.object_array = [this.circle]
    }

    display = () => {
        if (this.counter < this.data.length) {
            this.p.background(50);
            this.p.fill(this.c1)
            this.p.circle(this.data.position[this.counter].x, this.data.position[this.counter].y, 2 * this.radius1)
            this.vecDisplay(this.counter)
        }
    }

    vecDisplay = (c) => {
        let i = Vector.create(0, 1)
        let j = Vector.create(1, 0)
        let v_i = Vector.mult(i, Vector.dot(i, this.data.velocity[c]))
        let v_j = Vector.mult(j, Vector.dot(j, this.data.velocity[c]))
        let scale = 10
        let g = Vector.create(0, 9.8)

        if (this.toggles['gravity']) {
            displayVec(this.p, this.data.position[c], g, scale, 'rgb(0,250,80)');
        }

        if (this.toggles['velocity']) {
            displayVec(this.p, this.data.position[c], this.data.velocity[c], scale, 'white')
        }

        if (this.toggles['velocity_i']) {
            displayVec(this.p, this.data.position[c], v_i, scale, 'orange')
        }

        if (this.toggles['velocity_j']) {
            displayVec(this.p, this.data.position[c], v_j, scale, 'red');
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
        let velocity = Vector.clone(this.circle.velocity)
        this.data.time.push(time)
        this.data.position.push(position)
        this.data.velocity.push(velocity)
        this.data.length += 1
    }

    postProcess = () => {
        this.trim(0, 3)
    }

    stopCondition = () => {
        if (this.circle.position.y >= this.height) {
            return true
        }

        return false
    }
}