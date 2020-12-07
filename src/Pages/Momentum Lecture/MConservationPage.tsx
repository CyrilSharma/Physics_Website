import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Interactable from "../../Interactable"
import MConservationGUI from "../../Simulations/Momentum Lecture/MConservationGUI"
import MConservationSim from "../../Simulations/Momentum Lecture/MConservation"


const SemicirclePage = () => {
    const simulation = new MConservationSim(600)

    return (
        <Container>
              <Row>
                <Col>
                  <Interactable simulation={simulation}>
                    <MConservationGUI simulation={simulation}></MConservationGUI>
                  </Interactable>
                </Col>
              </Row>
        </Container>
    )
}

export default SemicirclePage
