import ITable from "./Table";
import IPort from "./Port";
import IPacket from "./Packet";

export default interface IHost {
  ip: string;
  mac: string;
  arpTable: ITable;
  port: IPort;

  send: (packet: IPacket) => void;
  receive: (packet: IPacket) => void;

  addLink: (connection: IPort) => void;
}
