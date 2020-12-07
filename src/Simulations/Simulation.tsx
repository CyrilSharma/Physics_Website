import * as Matter from 'matter-js'
import * as React from 'react';
import {Engine, World} from 'matter-js'
import { dataContainer } from '../dataContainer';
    
export abstract class Simulation {

    myRef;
    counter: number;
    height: number;
    width: number;
    paused: boolean;
    timestep = 1 / 60;
    engine: Matter.Engine;
    world: Matter.World;
    object_array?: any
    data = new dataContainer()
    toggles: object;
    p: any;

    constructor(h: number) {
        this.counter = 0;
        this.paused = true;
        this.myRef = React.createRef()

        // Filler values
        this.height = h;
        this.width = 0;
        this.toggles = {}

        this.engine = Engine.create();
        this.world = this.engine.world;
    }

    abstract setup = () => {}

    // abstract changeInit = 

    abstract store = (iterations) => {}

    abstract display = () => {}

    abstract stopCondition(): boolean;

    abstract vecDisplay = (counter) => {}

    abstract recompute = () => {}

    postProcess = () => {}

    postUpdate = (iteration) => {}

    reset = () => {
        Engine.clear(this.engine);
        World.clear(this.engine.world, false);
        this.setup()
        if (this.object_array !== undefined) {
            World.add(this.world, this.object_array);
        }
        this.display()
        this.counter = 0
    }

    toggle = (toggle) => {
        return (state) => {
            this.toggles[toggle] = state
            this.display()
        }
    }

    trim = (beginning, end) => {
        for (let i = 0; i < beginning; i++) {
            this.data.shift()
        }
        for (let i = 0; i < end; i++) {
            this.data.pop()
        }
    } 

    precalculate = () => {
        var stopped = false;
        var iteration = 0;
        this.data.reset()

        while (!stopped) {
            this.store(iteration)
            stopped = this.stopCondition()
            Engine.update(this.engine, this.timestep)
            this.postUpdate(iteration)
            iteration += 1
        }

        this.recompute()
        this.reset()
        this.postProcess()
    }

    whenRunning = () => {

    }

    simulation_instance = (p: any) => {
        this.p = p;
        p.setup = () => {
            p.createCanvas(this.width, this.height)
            this.setup()
            this.reset()
            this.precalculate()
        }
    
        p.draw = () => {
            if (!this.paused) {
                this.display()
                this.whenRunning()
                this.counter += 1
            }
        }
    }

}