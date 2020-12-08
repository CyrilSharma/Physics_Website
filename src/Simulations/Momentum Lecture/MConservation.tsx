import {Vector, Body, Bodies} from 'matter-js'
import { displayVec } from '../../displayVec';
import { Simulation } from "../Simulation";
import * as func from '../../Function';
import { dataContainer } from '../../dataContainer';
import { clone } from 'lodash';
import { displayRect } from '../../MatterJSWrappers/Box';

class simData extends dataContainer {
    time = Array<number>();
    position1 =Array<Matter.Vector>();
    velocity1 = Array<Matter.Vector>();
    acceleration1 = Array<Matter.Vector>();
    position2 =Array<Matter.Vector>();
    velocity2 = Array<Matter.Vector>();
    acceleration2 = Array<Matter.Vector>();
}

export default class MConservationSim extends Simulation {
    side_l = 50
    rectangle1?: any; 
    rectangle2?: any;
    ground?: any;
    mass1 = 0.05;
    mass2 = 0.05;
    data = new simData()

    setup = () => {
        let options_b1 = {friction: 0, frictionAir: 0, mass: this.mass1, restitution: 1};
        let options_b2 = {friction: 0, frictionAir: 0, mass: this.mass2, restitution: 1};
        let options_g = {friction: 0, frictionAir: 0, mass: 1, isStatic: true};
        this.rectangle1 = Bodies.rectangle(this.width/4, this.height - 5 - this.side_l / 2, this.side_l, this.side_l, options_b1);
        this.rectangle2 = Bodies.rectangle(2 * this.width/4, this.height - 5 - this.side_l / 2, this.side_l, this.side_l, options_b2);
        this.ground = Bodies.rectangle(this.width/2, this.height, this.width, 10, options_g);
        this.timestep = 1/100
        // this.world.gravity.y = 0.588;
        Body.setVelocity(this.rectangle1, Vector.create(5, 0))
        Body.setVelocity(this.rectangle2, Vector.create(0, 0))
        this.object_array = [this.rectangle1, this.rectangle2, this.ground]
    }

    display = () => {
        if (this.counter < this.data.length) {
            this.p.background(50);
            this.p.fill(this.p.color('rgb(255, 205, 2)'))
            displayRect(this.p, this.data.position1[this.counter].x, this.data.position1[this.counter].y, this.side_l, this.side_l, 0)
            this.p.fill(this.p.color('rgb(0,250,80)'))
            displayRect(this.p, this.data.position2[this.counter].x, this.data.position2[this.counter].y, this.side_l, this.side_l, 0)
            this.p.fill(this.p.color('rgb(100,100,100)'))
            displayRect(this.p, this.ground.position.x, this.ground.position.y, this.width, 10, 0)
            this.vecDisplay(this.counter)
        }
    }

    vecDisplay = (c) => {
        let scale = 10

        if (this.toggles['velocity2']) {
            displayVec(this.p, this.data.position2[c], this.data.velocity2[c], scale, 'white')
        }

        if (this.toggles['velocity1']) {
            displayVec(this.p, this.data.position1[c], this.data.velocity1[c], scale, 'rgb(191,0,255)');
        }

        if (this.toggles['force1']) {
            displayVec(this.p, this.data.position1[c], Vector.mult(this.data.acceleration1[c], this.rectangle1.mass), scale / 3, 'rgb(0,250,80)', 10)
        }

        if (this.toggles['force2']) {
            displayVec(this.p, this.data.position2[c], Vector.mult(this.data.acceleration2[c], this.rectangle2.mass), scale / 3, 'yellow', 10)
        }
    }

     recompute = () => {
        var velocity1 = clone(this.data.velocity1)
        var velocity2 = clone(this.data.velocity2)
        var acceleration1 = func.derivative(velocity1, this.timestep)
        var acceleration2 = func.derivative(velocity2, this.timestep)
        this.data.acceleration1 = acceleration1;
        this.data.acceleration2 = acceleration2;
    }

    store = (iteration) => {
        let time = this.timestep * iteration
        let position1 = Vector.clone(this.rectangle1.position)
        let velocity1 = Vector.clone(this.rectangle1.velocity)
        let position2 = Vector.clone(this.rectangle2.position)
        let velocity2 = Vector.clone(this.rectangle2.velocity)
        this.data.time.push(time)
        this.data.position1.push(position1)
        this.data.velocity1.push(velocity1)
        this.data.position2.push(position2)
        this.data.velocity2.push(velocity2)
        this.data.length += 1
    }

    postProcess = () => {
        this.trim(8, 3)
    }

    stopCondition = () => {
        if (this.data.time.length >= 100) {
            return true
        }
        return false
    }
}