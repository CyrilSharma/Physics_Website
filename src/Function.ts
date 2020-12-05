import { Vector } from 'matter-js'

export const diff = (array: Array<Vector>): Array<Vector> => {
    let newA = new Array<Vector>()
    for (var i = 1; i < array.length; i++) {
        newA.push(Vector.sub(array[i], array[i - 1]))
    }
    newA.push(Vector.create(0, 0))
    return newA;
}

export const derivative = (array: Array<Vector>, dt: number): Array<Vector> => {
    return diff(array).map(x => Vector.div(x, dt))
}