// import 

export default class Message {

    length: number
    sourceMac: string
    destinationMac: string
    payload: string

    constructor(length: number, sourceMac: string, destinationMac: string, payload: string) {
        this.length = length
        this.sourceMac = sourceMac
        this.destinationMac = destinationMac
        this.payload = payload
    }
}