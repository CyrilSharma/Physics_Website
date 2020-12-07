import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Checkbox } from '../../Checkbox';
import GUI from '../Gui';
import { Slider } from '../../Slider';
import { TimeSlider } from '../../TimeSlider';

export default class MConservationGUI extends GUI {

    mass1Slider = (value) => {
        this.simulation.mass1 = value
        this.simulation.reset()
        this.simulation.precalculate()
        this.simulation.counter = 0
    }

    mass2Slider = (value) => {
        this.simulation.mass2 = value
        this.simulation.reset()
        this.simulation.precalculate()
        this.simulation.counter = 0
    }

    public render() {
        return (<>
            <Container style={{backgroundColor: 'rgb(100, 100, 100)'}}>
                <Row className="justify-content-md-center pt-3">
                    <Col  xs lg="3">
                        <TimeSlider text="Time" initVal={0} max={100} changeHandler={this.timeSlider} ></TimeSlider>
                        <Slider text="Mass for Block 1" step={0.05} initVal={0.05} min={0.05} max={0.50} changeHandler={this.mass1Slider} ></Slider>
                        <Slider text="Mass for Block 2" step={0.05} initVal={0.05} min={0.05} max={0.50} changeHandler={this.mass2Slider} ></Slider>
                        <Button style={{marginBottom: 20}} variant="dark" onClick={this.start}> Start </Button>&nbsp;
                    </Col>
                    <Col xs lg="3">
                        <Checkbox text="Left Block's Velocity" checked={false} changeHandler={this.simulation.toggle('velocity1')}></Checkbox>
                        <Checkbox text="Right Block's Velocity" checked={false} changeHandler={this.simulation.toggle('velocity2')}></Checkbox>
                        <Checkbox text="Force on left block" checked={false} changeHandler={this.simulation.toggle('force1')}></Checkbox>
                        <Checkbox text="Force on right block" checked={false} changeHandler={this.simulation.toggle('force2')}></Checkbox>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}


