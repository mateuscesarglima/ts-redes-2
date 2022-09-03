import ILink from "../interface/Link";
import IPacket from "../interface/Packet";
import IPort from "../interface/Port";

export default class Link implements ILink {
  port1!: IPort;
  port2!: IPort;

  constructor(port1?: IPort, port2?: IPort) {
    port1 && (this.port1 = port1);
    port2 && (this.port2 = port2);
  }

  send(device: IPort, packet: IPacket) {
    if (device === this.port1) {
      this.port2?.receive(packet);
    } else {
      this.port1?.receive(packet);
    }
  }

  add(port1: IPort, port2: IPort) {
    this.port1 = port1;
    this.port2 = port2;
  }
}
