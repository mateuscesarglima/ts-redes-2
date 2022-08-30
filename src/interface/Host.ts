import ITable from "./ArpTable";
import ILink from "./Link";
import IPacket from "./Packet";

export default interface IHost {
  ip: string;
  mac: string;
  arpTable: ITable;
  link: ILink;

  send: (payload: string, destinationIp: string) => void;
  receive: (packet: IPacket) => void;
}
