import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Checkbox } from '../../Checkbox';
import GUI from '../Gui';
import { Slider } from '../../Slider';
import { TimeSlider } from '../../TimeSlider';

export default class TrajectoryGUI extends GUI {

    public render() {
        return (<>
            <Container style={{backgroundColor: 'rgb(100, 100, 100)'}}>
                <Row className="justify-content-md-center pt-3">
                    <Col  xs lg="3">
                        <TimeSlider text="Time" initVal={0} max={100} changeHandler={this.timeSlider} ></TimeSlider>
                        <Button style={{marginBottom: 20}} variant="dark" onClick={this.start}> Start </Button>&nbsp;
                    </Col>
                    <Col xs lg="3">
                        <Checkbox text="Velocity" checked={false} changeHandler={this.simulation.toggle('velocity')}></Checkbox> 
                        <Checkbox text="Vertical Velocity" checked={false} changeHandler={this.simulation.toggle('velocity_i')}></Checkbox>
                        <Checkbox text="Horizontal Velocity" checked={false} changeHandler={this.simulation.toggle('velocity_j')}></Checkbox>
                        <Checkbox text="Gravity" checked={false} changeHandler={this.simulation.toggle('gravity')}></Checkbox>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}


