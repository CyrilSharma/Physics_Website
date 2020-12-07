import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { TrajectorySim } from "../../Simulations/Forces Lecture/Trajectory"
import TrajectoryGUI from "../../Simulations/Forces Lecture/TrajectoryGUI"
import Interactable from "../../Interactable"

const SemicirclePage = () => {
    const simulation = new TrajectorySim(600)

    return (
        <Container>
              <Row>
                <Col>
                  <Interactable simulation={simulation}>
                    <TrajectoryGUI simulation={simulation}></TrajectoryGUI>
                  </Interactable>
                </Col>
              </Row>
        </Container>
    )
}

export default SemicirclePage
