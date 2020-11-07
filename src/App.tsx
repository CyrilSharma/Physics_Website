import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { trajectory_handler } from './Simulations';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Col, Container, Row } from 'react-bootstrap';
import Simulation from './Simulation'


// Alternate solution:
// As soon as the component is mounted get the references??
// At a fundamental level, I need some way to retrieve the P5 object from the simulation object.
// To create the P5 object, I need the reference to its container, which is housed in the simulation object.
// The reference to the objects container is only known when the object has already been rendered.
// Hence, I need a way of getting the P5 object out of the sketch on

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Container>
            <Row>
              <Col><Simulation simHandler={trajectory_handler}></Simulation></Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default App;
