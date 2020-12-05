import React from 'react'
import { Simulation } from './Simulation';

export interface ISimProps {
    simulation: Simulation
}

export interface ISimState {
}

export default abstract class GUI extends React.Component<ISimProps, ISimState> {
    simulation;

    constructor(props: ISimProps) {
        super(props);
        this.simulation = this.props.simulation
    }

    start = () => {
        this.simulation.paused = false;
    }

    reset = () => {
        this.simulation.reset();
    }

    pause = () => {
        this.simulation.paused = true;
    }


    timeSlider = (value: number, max: number | undefined) => {
        this.pause();
        // If max is undefined, assign it to its default value, else assign it to its specified value
        let max_val = max ? max : 100;
        let timesteps = this.simulation.data.length
        let counterVal = Math.round((timesteps - 1) * (value / max_val));
        this.simulation.counter = counterVal;
        this.simulation.display(this.simulation.p.counter);
        return this.simulation.data.time[counterVal]
    }

    abstract render()
}


