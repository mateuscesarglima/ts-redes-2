import ITable from "../interface/Table";
import ISwitch from "../interface/Switch";
import { decodeMessage, encodeMessage } from "../utils";
import IPacket, { PacketHeaderEnum } from "../interface/Packet";
import Table from "./ArpTable";
import IPort from "../interface/Port";
import Port from "./Port";
import { Constants } from "../constants";

export default class Switch implements ISwitch {
  public forwardingTable: ITable;
  public ports: IPort[];
  public qtdPorts: number;

  constructor(qtdPports?: number) {
    this.forwardingTable = new Table();
    this.qtdPorts = qtdPports || 4;
    this.ports = Array.from(
      { length: this.qtdPorts },
      (x, y) => new Port(y + 1, this)
    );
  }

  receive(packet: IPacket) {
    console.log({ method: "RECEIVE [SWITCH]", packet });
    this.processing(packet);

    if (
      packet.header === PacketHeaderEnum.ArpRequest ||
      packet.header === PacketHeaderEnum.ArpReply ||
      packet?.destinationMac === Constants.withoutDestinationMac
    ) {
      this.broadcast(packet);
    }
  }

  send!: (packet: IPacket) => void;

  addLink(connection: IPort, port: number) {
    console.log({ method: "ADD LINK", connection });
    this.ports[port - 1].add(this.ports[port - 1], connection);
  }

  private broadcast(packet: IPacket) {
    console.log({ method: "BROADCAST" });
    this.ports.forEach((port) => port.send(packet));
  }

  private processing(packet: IPacket) {
    console.log({ method: "PROCESSING" });
    this.ports.forEach((port) => {
      const portWithPacket = port.queueReceive.find((el) => el === packet);
      if (portWithPacket) {
        this.forwardingTable.load({
          mac: portWithPacket.originIp,
          port: port.num,
          isSwitch: true,
        });
      }
    });
  }
}
