export class dataContainer {
    length: number
    time: Array<number>
    constructor() {
        this.length = 0;
        this.time = new Array<number>()
    }

    pop() {
        let enumerableKeys = Object.keys(this)
        for (let k=1; k < enumerableKeys.length; k++){
            this[enumerableKeys[k]].pop()
        }
        this.length -= 1;
    }

    shift() {
        let enumerableKeys = Object.keys(this)
        for (let k=1; k < enumerableKeys.length; k++){
            this[enumerableKeys[k]].shift()
        }
        this.length -= 1
    }

    reset() {
        this.length = 0;
        let enumerableKeys = Object.keys(this)
        for (let k=1; k < enumerableKeys.length; k++){
            this[enumerableKeys[k]].length = 0
        }
    }
}