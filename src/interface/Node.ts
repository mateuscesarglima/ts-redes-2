import IHost from "./Host";
import IPacket from "./Packet";
import ISwitch from "./Switch";

interface INode {
  connection?: IHost | ISwitch;
}

export default INode;
