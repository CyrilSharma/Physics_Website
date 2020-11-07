import p5 from "p5";
import React from "react";
  
  export const SimulationContext = React.createContext({
    p5Global:  null,
    createSimulation: (p5?:p5) => {
    }
  });