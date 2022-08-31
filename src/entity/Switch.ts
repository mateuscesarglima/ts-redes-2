import ITable from "../interface/Table";
import ILink from "../interface/Link";
import INode from "../interface/Node";
import Packet, { PacketHeaderEnum } from "../interface/Packet";
import ISwitch from "../interface/Switch";
import { decodeMessage } from "../utils";
import Link from "./Link";
import IPacket from "../interface/Packet";
import { Constants } from "../constants";
import Table from "./ArpTable";

export default class Switch implements ISwitch {
  forwardingTable: ITable;
  ports: { [key: string]: number };
  link: ILink[];

  constructor() {
    this.forwardingTable = new Table();
    this.ports = {};
    this.link = [];
  }

  receive(packet: string) {
    console.log({ method: "RECEIVE [SWITCH]" });
    const decPacket = decodeMessage(packet);

    if (
      decPacket.header === PacketHeaderEnum.ArpRequest ||
      decPacket.header === PacketHeaderEnum.ArpReply ||
      decPacket?.destinationMac === Constants.withoutDestinationMac ||
      !this.findDataForwardingTable(decPacket?.destinationMac)
    ) {
      this.broadcast(decPacket);
    }
  }

  send!: (packet: Packet) => void;

  addLink(connection: INode["connection"], port: number) {
    this.link.push(new Link(this, connection));
  }

  private findDataForwardingTable(destinationMac?: string) {
    return (
      destinationMac &&
      this.forwardingTable.data.findIndex((el) => el.mac === destinationMac) !==
        -1
    );
  }

  private broadcast(packet: IPacket) {
    console.log({ method: "BROADCAST", packet });
    // this.forwardingTable.load();
  }
}
