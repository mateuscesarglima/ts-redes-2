import ITable from "./Table";
import ILink from "./Link";
import INode from "./Node";
import IPacket from "./Packet";

export default interface IHost {
  ip: string;
  mac: string;
  arpTable: ITable;
  link: ILink;

  send: (
    payload: string,
    destinationIp: string,
    destinationMac?: string
  ) => void;
  receive: (packet: string) => void;

  addLink: (connection: INode["connection"]) => void;
}
