import ILink from "../interface/Link";
import INode from "../interface/Node";
import Packet from "../interface/Packet";

export default class Link implements ILink {
  port1!: INode["connection"];
  port2!: INode["connection"];

  constructor(port1?: INode["connection"], port2?: INode["connection"]) {
    this.port1 = port1;
    this.port2 = port2;
  }

  send(device: INode["connection"], packet: string) {
    if (device === this.port1) {
      this.port2?.receive(packet);
    } else {
      this.port1?.receive(packet);
    }
  }

  add(port1: INode["connection"], port2: INode["connection"]) {
    this.port1 = port1;
    this.port2 = port2;
  }
}
