import { Constants } from "../constants";
import IArpTable from "../interface/Table";
import IHost from "../interface/Host";
import ILink from "../interface/Link";
import INode from "../interface/Node";
import IPacket, { PacketHeaderEnum } from "../interface/Packet";
import { generateHex, print } from "../utils";
import ArpTable from "./ArpTable";
import Link from "./Link";
import Packet from "./Packet";

export default class Host implements IHost {
  public ip: string;
  public mac: string;
  public arpTable: IArpTable;
  public link: ILink;

  constructor(ip: string) {
    this.ip = ip;
    this.mac = generateHex();
    this.arpTable = new ArpTable();
    this.link = new Link();
  }

  send(payload: string, destinationIp: string, destinationMac?: string) {
    print(`SEND MESSAGE [HOST: ${this.ip}] to [HOST: ${destinationIp}]`);
    if (!this.link) {
      return console.log({ error: "Must be connected" });
    }

    const hasDestinationMac = this.arpTable.data.find(
      (el) => el.ip === destinationIp
    );

    if (!destinationMac) {
      this.arpRequest();
    }
  }

  receive(packet: string) {
    console.log({ method: "RECEIVE [HOST]" });
  }

  addLink(connection: INode["connection"]) {
    this.link = new Link(this, connection);
  }

  private arpRequest() {
    print("ARP REQUEST");
    const message = {
      originIp: this.ip,
      originMac: this.mac,
      payload: Constants.arpRequestPayload,
      header: PacketHeaderEnum.ArpRequest,
    } as IPacket;

    const packet = new Packet(message);

    this.link.send(this, packet.generate(message));
  }
}
