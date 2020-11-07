import React from 'react'
import p5 from 'p5'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Slider } from './Slider'

export interface ISimProps {
    simHandler: (p: any) => void
}

export interface ISimState {
}

export default class Simulation extends React.Component<ISimProps, ISimState> {
    private myRef;
    private myP5;
    private time;
    private timestep;
    constructor(props: ISimProps) {
        super(props);
        this.myRef = React.createRef()
    }

    private start = () => {
        this.myP5.start();
        this.timestep = this.myP5.timeStep();
        this.time = this.myP5.simTime();
    }

    private pause = () => {
        this.myP5.pause();
    }

    private tSliderHandler = (value: number, max: number | undefined) => {
        this.pause();
        console.log("max: " + max);
        let max_val = max ? max : 100;
        console.log("max_val: " + max_val);
        let counterVal = Math.round((this.time * value) / (max_val * this.timestep));
        console.log("time: " + this.time);
        console.log("value: " + value);
        console.log("CounterVal: " + counterVal);
        this.myP5.setCounter(counterVal);
        this.myP5.display();

    }

    private reset = () => {
        this.myP5.reset();
        this.time = this.myP5.simTime();
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.props.simHandler, this.myRef.current)  
    }

    public render() {
        return (
            <div>
                <div ref={this.myRef}>   
                </div>
                <Row className="justify-content-md-center">
                  <Slider text="Hello" initVal={0} max={100} changeHandler={this.tSliderHandler}></Slider>
                </Row>
                <Button variant="dark" onClick={this.start}> Start </Button>&nbsp;
                <Button variant="dark" onClick={this.reset}> Reset </Button>
            </div>
        );
    }
}


