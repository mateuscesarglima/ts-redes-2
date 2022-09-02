import ITable from "./Table";
import IPort from "./Port";
import IPacket from "./Packet";

export default interface IHost {
  ip: string;
  mac: string;
  arpTable: ITable;
  port: IPort;

  send: (
    payload: string,
    destinationIp: string,
    destinationMac?: string
  ) => void;
  receive: (packet: IPacket) => void;

  addLink: (connection: IPort) => void;
}
