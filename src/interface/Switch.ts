import ITable from "./ArpTable";
import ILink from "./Link";
import INode from "./Node";
import IPacket from "./Packet";

export default interface ISwitch {
  forwardingTable: ITable;
  ports: number[];
  link: ILink[];

  receive: (packet: IPacket) => void;
  send: (packet: IPacket) => void;

  addLink: (connection: INode["connection"], port: number) => void;
}
