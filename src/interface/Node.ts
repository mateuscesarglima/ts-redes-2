import IHost from "./Host";
import IPacket from "./Packet";
import ISwitch from "./Switch";

interface INode {
  connection: IHost | ISwitch;

  send: (device: IHost | ISwitch, packet: IPacket) => void;
}

export default INode;
