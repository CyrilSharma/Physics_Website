import React, { useState } from 'react'
import p5 from 'p5'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Simulation } from './Simulations/Simulation';
// import GUI from './Interactables/Gui';

export interface IProps {
    simulation: Simulation
}

export interface IState {}

export default class Interactable extends React.Component<IProps, IState> {
    private myRef;
    private myP5;
    private simulation;
    
    constructor(props: IProps) {
        super(props);
        this.myRef = React.createRef()
        this.simulation = this.props.simulation
        this.state = { 
            height: window.innerHeight,
            width: window.innerWidth
        }
        // window.addEventListener('resize', e => this.resizeHandler())
    }

    /* resizeHandler = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        })
    } */

    componentDidMount() {
        //We create a new p5 object on component mount, feed it
        console.log(this.myRef.current)
        this.props.simulation.width = this.myRef.current.offsetWidth
        this.myP5 = new p5(this.props.simulation.simulation_instance, this.myRef.current)
    }

    public render() {
        return (<>
            <div id="hummus" ref={this.myRef} style={{marginBottom: -10}}></div>
            {this.props.children}
            </>
        );
    }
}


