import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Interactable from "../../Interactable"
import { SemicircleSim } from "../../Simulations/Forces Lecture/Semicircle"
import SemicircleGUI from "../../Simulations/Forces Lecture/SemicircleGUI"

const SemicirclePage = () => {
    const simulation = new SemicircleSim(600);

    return (
        <Container>
              <Row>
                <Col>
                  <Interactable simulation={simulation}>
                    <SemicircleGUI simulation={simulation}></SemicircleGUI>
                  </Interactable>
                </Col>
              </Row>
        </Container>
    )
}

export default SemicirclePage