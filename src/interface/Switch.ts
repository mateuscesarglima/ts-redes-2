import ITable from "./Table";
import ILink from "./Link";
import INode from "./Node";
import IPacket from "./Packet";

export default interface ISwitch {
  forwardingTable: ITable;
  ports: { [key: string]: number };
  link: ILink[];

  receive: (packet: string) => void;
  send: (packet: IPacket) => void;

  addLink: (connection: INode["connection"], port: number) => void;
}
