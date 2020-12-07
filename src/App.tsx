import * as React from 'react';
import './App.css'
import Drawer from './Drawer';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import SemicirclePage from './Pages/Forces Lecture/SemicirclePage';
import TrajectoryPage from './Pages/Forces Lecture/TrajectoryPage';
import MConservationPage from './Pages/Momentum Lecture/MConservationPage'
// Alternate solution:
// As soon as the component is mounted get the references??
// At a fundamental level, I need some way to retrieve the P5 object from the simulation object.
// To create the P5 object, I need the reference to its container, which is housed in the simulation object.
// The reference to the objects container is only known when the object has already been rendered.
// Hence, I need a way of getting the P5 object out of the sketch on 
class App extends React.Component {

  render() {
    return (
    <>
      <BrowserRouter>
      <Drawer></Drawer>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SemicirclePage></SemicirclePage>
          </Route>
          <Route path="/Semicircle">
            <SemicirclePage></SemicirclePage>
          </Route>
          <Route path="/Trajectory">
            <TrajectoryPage></TrajectoryPage>
          </Route>
          <Route path="/Two Blocks">
            <MConservationPage></MConservationPage>
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    </>
    );
  }
}

export default App;
