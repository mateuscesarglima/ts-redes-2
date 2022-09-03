import IHost from "../interface/Host";
import ILink from "../interface/Link";
import IPacket from "../interface/Packet";
import IPort from "../interface/Port";
import ISwitch from "../interface/Switch";
import { generateHex } from "../utils";
import Link from "./Link";

export default class Port implements IPort {
  public num: number;
  public queueSend: IPacket[];
  public queueReceive: IPacket[];
  public mac: string;
  public link!: ILink;
  public connection: ISwitch | IHost;

  constructor(num: number, connection: ISwitch | IHost, link?: ILink) {
    this.num = num;
    this.connection = connection;
    this.queueSend = [];
    this.queueReceive = [];
    this.mac = generateHex();
    link && (this.link = link);
  }

  receive(packet: IPacket) {
    // const findPacket = this.queueReceive.find((pkt) => pkt === packet);
    this.queueReceive.push(packet);
    this.connection.receive(packet);
  }

  send(packet: IPacket) {
    this.queueSend.push(packet);
    this.link?.send(this, packet);
  }

  add(port1: IPort, port2: IPort) {
    this.link = new Link(port1, port2);
  }
}
