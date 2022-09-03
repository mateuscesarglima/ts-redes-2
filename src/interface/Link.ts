import IPacket from "./Packet";
import IPort from "./Port";

interface ILink {
  port1: IPort;
  port2: IPort;

  add: (port1: IPort, port2: IPort) => void;

  send: (device: IPort, packet: IPacket) => void;
}

export default ILink;
