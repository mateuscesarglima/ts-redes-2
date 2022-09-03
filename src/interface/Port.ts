import IHost from "./Host";
import ILink from "./Link";
import IPacket from "./Packet";
import ISwitch from "./Switch";

export default interface IPort {
  num: number;
  queueSend: IPacket[];
  queueReceive: IPacket[];
  mac: string;
  link: ILink;
  connection: ISwitch | IHost;

  receive: (packet: IPacket) => void;
  send: (packet: IPacket) => void;
  add: (port1: IPort, port2: IPort) => void;
}
