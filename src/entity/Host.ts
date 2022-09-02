import { Constants } from "../constants";
import IArpTable from "../interface/Table";
import IHost from "../interface/Host";
import IPacket, { PacketHeaderEnum } from "../interface/Packet";
import { Colors, decodeMessage, generateHex, print } from "../utils";
import ArpTable from "./ArpTable";
import Packet from "./Packet";
import IPort from "../interface/Port";
import Port from "./Port";

export default class Host implements IHost {
  public ip: string;
  public mac: string;
  public arpTable: IArpTable;
  public port: IPort;

  constructor(ip: string) {
    this.ip = ip;
    this.mac = generateHex();
    this.arpTable = new ArpTable();
    this.port = new Port(1, this);
  }

  send(payload: string, destinationIp: string, destinationMac?: string) {
    print(`SEND MESSAGE [HOST: ${this.ip}] TO [HOST: ${destinationIp}]`);

    if (!destinationMac) {
      this.arpRequest(destinationIp, payload);
    }
  }

  receive(packet: IPacket) {
    console.log(
      Colors.FgBlue,
      { method: `RECEIVE [HOST: ${this.ip}]` },
      Colors.Reset
    );

    if (this.ip !== packet.originIp)
      this.arpTable.load({ ip: packet.originIp, mac: packet.originMac });

    if (packet.destinationIp === this.ip) {
      console.log(
        Colors.FgMagenta,
        { status: "IS MESSAGE TO ME" },
        Colors.Reset
      );
    } else {
    }
  }

  addLink(connection: IPort) {
    this.port.add(this.port, connection);
  }

  private arpRequest(destinationIp: string, payload: any) {
    print("ARP REQUEST");
    const message = {
      originIp: this.ip,
      originMac: this.mac,
      payload,
      header: PacketHeaderEnum.ArpRequest,
      destinationIp,
    } as IPacket;

    const packet = new Packet(message);

    this.port.send(packet);
  }
}
