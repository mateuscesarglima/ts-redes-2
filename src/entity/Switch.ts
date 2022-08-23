// import 

import Message from "./Message"

export default class Switch {

    private _macAddress: string
    // table: MacAddressTable[]

    constructor(ports: number, macAddress: string) {
        this._macAddress = macAddress
    }

    get macAddress() {
        return this._macAddress
    }

    forward(message: Message) {
        
    }
}