import { Mover } from "../../Mover"
import { displayVec } from "../../displayVec";

/* export const collidingSem = new EightBitSprite("Bird");
collidingSem.handler()

export const collidingSem_1 = new EightBitSprite_1("Bird");
collidingSem_1.handler() */
export const trajectory_handler = (p: any) => {

    // Native p5 functions work as they would normally but prefixed with 
    // a p5 object "p"

    // Whether or not the simulation has started or not
    let start = false;

    // Canvas dimensions
    const width = 640;
    const height = 360;

    // Mover  object
    let mover = new Mover(20, 60, height - 10, 70, -p.PI / 4, 20, p);

    // Gravity
    const g = 9.8;
    let gravity = p.createVector(0, g * mover.mass);

    // Simulation time step.
    const dt = 0.07;

    // Data
    let data = Array<any>();

    // Determines where you are in the data
    let counter = 0;

    let component = true;

    // p.setup = () => {
    //     p.createCanvas(width, height)
    //     p.preCalculate()
    //     p.reset();
    //     p.frameRate(60)
    // }

    p.setup = () => {
        p.createCanvas(width, height)
        p.reset()
        p.preCalculate()
    }

    p.draw = () => {
        if (start)
        {
            p.display();
            counter += 1
        }
    }

    const display = () => {
        if (counter < data.length) {
            p.background(127);
            mover.display(data[counter][0].x, data[counter][0].y);
            p.vecDisplay(counter)
        }
    }

    p.vecDisplay = (counter: number) => {
        if (component) {
            let vx = p.createVector(data[counter][1].x, 0)
            let vy = p.createVector(0, data[counter][1].y)
            // Acceleration
            displayVec(p, data[counter][0], data[counter][2], 4, 'blue');
            // Velocity
            displayVec(p, data[counter][0], vx, 1, 'white');
            // Velocity
            displayVec(p, data[counter][0], vy, 1, 'white');
        }

        else {
            // Velocity
            displayVec(p, data[counter][0], data[counter][1], 2, 'white');
            // Acceleration
            displayVec(p, data[counter][0], data[counter][2], 2, 'blue');
        }
    }

    // For GUI purposes

    p.start = () => {
        start = true;
    }
    

    p.pause = () => {
        start = false;
    }

    // Restart all the Mover objects randomly
    p.reset = () => {
        start = false;
        mover = new Mover(20, 60, height - 10, 70, -p.PI / 4, 20, p);
        p.background(127);
        mover.display(mover.position.x, mover.position.y);
        counter = 0;
    }

    p.setCounter = (value: number) => {
        counter = value;
    }

    p.timeStep = () => {
        return dt;
    }

    p.simTime = () => {
        return data.length * dt;
    }

    // For storage purposes
    p.preCalculate = () => {
        let grounded = false
        //  Continue storing data until the ball is grounded
        let position = mover.position;
        let velocity = mover.velocity;
        let acceleration = mover.acceleration;
        let entry = [position, velocity, acceleration]
        data.push(entry)

        while (grounded === false) {
        //var i = 0;
        //for (i = 0; i < 10000; i++) {
            // Calculate new states
            let acceleration = mover.calculate_Force(gravity);
            let states = mover.update(dt);
            let position = states[0];
            let velocity = states[1];

            mover.position = position
            mover.velocity = velocity
            mover.acceleration = acceleration

            // Determine states if there was a collision
            states = mover.checkEdges(height);
            position = states[0];
            velocity = states[1];
            acceleration = states[2];

            grounded = p.stopCondition()

            // Create new entry.
            let entry = [position, velocity, acceleration]

            // Update mover
            mover.position = position
            mover.velocity = velocity
            mover.acceleration = acceleration

            // Store data.
            data.push(entry)
        }
    }

    p.stopCondition = () => {
        // && (Math.abs(mover.velocity.y) < 0.1) && (Math.abs(mover.acceleration.y) < 0.1)) 
        if ((Math.abs(mover.position.y - (height - mover.size / 2)) < 0.1) && (Math.abs(mover.velocity.y) < 0.1)) {

                return true
        }
        else {
            return false
        }
    }
}