export class Polynomial {

    coefficients: Array<number>;

    constructor(coefficients: Array<number>) {
        this.coefficients = coefficients
    }

    evaluate(num: number) {
        var sum = 0
        var i = 0
        for (i = 0; i < this.coefficients.length; i++) {
            sum += (this.coefficients[i] * Math.pow(num, i))
        }
        return sum
    }

    derivative() {
        var derivative = new Array<number>()
        var i = 1
        for (i = 1; i < this.coefficients.length; i++) {
            derivative.push(this.coefficients[i] * i)
        }
        return new Polynomial(derivative)
    }
}