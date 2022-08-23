// import 

import Message from "./Message"
import Switch from "./Switch"

export default class Host {

    private _macAddress: string
    private _ip: string
    private _switch: Switch

    constructor(macAddress: string, ip: string, switchClass: Switch) {
        this._macAddress = macAddress
        this._ip = ip
        this._switch = switchClass
    }

    sendMessage(message: Message): void {
        this._switch
    }
}