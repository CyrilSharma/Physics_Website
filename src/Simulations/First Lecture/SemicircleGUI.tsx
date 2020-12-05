import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Checkbox } from '../../Checkbox';
import GUI from '../Gui';
import { Slider } from '../../Slider';

export default class SemicircleGUI extends GUI {

    public render() {
        return (<>
            <Container style={{backgroundColor: 'rgb(100, 100, 100)'}}>
                <Row className="justify-content-md-center pt-3">
                    <Col  xs lg="3">
                        <Slider text="Time" initVal={0} max={100} changeHandler={this.timeSlider} ></Slider>
                        <Button style={{marginBottom: 20}} variant="dark" onClick={this.start}> Start </Button>&nbsp;
                    </Col>
                    <Col xs lg="3">
                        <Checkbox text="Velocity" checked={false} changeHandler={this.simulation.toggle('velocity')}></Checkbox> 
                        <Checkbox text="Normal Force" checked={false} changeHandler={this.simulation.toggle('normal_f')}></Checkbox>
                        <Checkbox text="Gravity" checked={false} changeHandler={this.simulation.toggle('gravity')}></Checkbox>
                        <Checkbox text="Required Centripetal Force" checked={false} changeHandler={this.simulation.toggle('acc_c')}></Checkbox>
                    </Col>
                    <Col xs lg="3">
                        <Checkbox text="Gravity: Radial Component" checked={false} changeHandler={this.simulation.toggle('gravity_r')}></Checkbox>
                        <Checkbox text="Gravity: Tangential Component" checked={false} changeHandler={this.simulation.toggle('gravity_t')}></Checkbox>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}


