import { Vector } from 'matter-js'

export const diff = (array: Array<Vector>): Array<Vector> => {
    let newA = new Array<Vector>()
    newA.push(Vector.create(0, 0))
    for (var i = 1; i < array.length - 1; i++) {
        newA.push(Vector.mult((Vector.sub(array[i + 1], array[i - 1])), 0.5))
    }
    newA.push(Vector.create(0, 0))
    return newA;
}

export const derivative = (array: Array<Vector>, dt: number): Array<Vector> => {
    return diff(array).map(x => Vector.div(x, dt))
}