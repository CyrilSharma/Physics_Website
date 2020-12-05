import * as React from 'react';
import './App.css'
import { SemicircleSim } from './Simulations/First Lecture/Semicircle';
import { Col, Container, Row } from 'react-bootstrap';
import Interactable from './Interactable'
import SemicircleGUI from './Simulations/First Lecture/SemicircleGUI';


// Alternate solution:
// As soon as the component is mounted get the references??
// At a fundamental level, I need some way to retrieve the P5 object from the simulation object.
// To create the P5 object, I need the reference to its container, which is housed in the simulation object.
// The reference to the objects container is only known when the object has already been rendered.
// Hence, I need a way of getting the P5 object out of the sketch on

class App extends React.Component {

  private simulation = new SemicircleSim(600);

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <Interactable simulation={this.simulation}>
                <SemicircleGUI simulation={this.simulation}></SemicircleGUI>
              </Interactable>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
