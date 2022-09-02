import ITable from "./Table";
import ILink from "./Link";
import INode from "./Node";
import IPacket from "./Packet";
import IPort from "./Port";

export default interface ISwitch {
  forwardingTable: ITable;
  ports: IPort[];
  qtdPorts: number;

  receive: (packet: IPacket) => void;
  send: (packet: IPacket) => void;

  addLink: (connection: IPort, port: number) => void;
}
