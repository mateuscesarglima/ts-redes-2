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

  send(packet: IPacket) {
    print(`SEND MESSAGE [HOST: ${this.ip}] TO [HOST: ${packet.destinationIp}]`);

    if (!packet.destinationMac) {
      return this.arpRequest(packet.destinationIp, packet.payload);
    }

    const _packet = new Packet(packet);

    if (packet?.header === PacketHeaderEnum.ArpReply) {
      console.log({ method: "HOST ARP REPLY" });
    }
    console.log({ method: "HOST SEND WITH DESTINATION MAC" });
    return this.port.send(_packet);
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
      if (!packet.header) return console.log({ status: "MESSAGE RECEIVED" });
      console.log(
        Colors.FgMagenta,
        { status: "IS MESSAGE TO ME" },
        Colors.Reset
      );
      const _packet: IPacket = {
        originIp: this.ip,
        originMac: this.mac,
        destinationIp: packet.originIp,
        destinationMac: packet.originMac,
        payload: packet.payload,
      };
      if (packet?.header === PacketHeaderEnum.ArpRequest) {
        const arpReplyPacket: IPacket = {
          ..._packet,
          header: PacketHeaderEnum.ArpReply,
        };

        this.send(new Packet(arpReplyPacket));
      } else {
        this.send(new Packet(_packet));
      }
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
