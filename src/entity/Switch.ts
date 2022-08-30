import { Constants } from "../constants";
import IArcTable from "../interface/ArcTable";
import IHost from "../interface/Host";
import IPackage from "../interface/Package";
import ISwitch from "../interface/Switch";
import { decodeMessage, print } from "../utils";

export default class Switch implements ISwitch {
  public table!: IArcTable | undefined;
  public qtdPorts: number = 1;
  public connections: IHost[] = [];

  constructor({ qtdPorts, connections, table }: ISwitch) {
    this.qtdPorts = qtdPorts;
    this.connections = connections;
    this.table = table;
  }

  // receive
  send(params: string, isReply?: boolean, isDirectReply?: boolean) {
    const decodedMessage: IPackage = decodeMessage(params);
    const hasDestinationMacArpTable = this.table?.data.find(
      (el) => el.ip === decodedMessage.destinationIp
    ); // renomear

    if (!isReply) {
      if (
        decodedMessage.destinationMac !== Constants.withoutDestinationMac ||
        !hasDestinationMacArpTable
      ) {
        console.log({ status: "BROADCAST", payload: decodedMessage.payload });
        return this.broadcast(decodedMessage);
      }
    }

    const getPort = this.getHostPort(decodedMessage.originIp);
    if (getPort.error) return getPort.error;

    this.table?.load(getPort, decodedMessage.originIp, true);

    if (isReply)
      this.connections.forEach((host, idx) => {
        decodedMessage.originIp !== host.ip &&
          host?.setArcTable &&
          host?.setArcTable(getPort, decodedMessage.originMac);
      });

    const originalSender = this.connections.find(
      (host) => host.ip === decodedMessage.destinationIp
    );

    !isDirectReply &&
      originalSender &&
      originalSender?.sendOriginal &&
      originalSender?.sendOriginal(decodedMessage);

    return;
  }

  private getHostPort(ip: string): any {
    const getPort = this.connections.findIndex((el) => el.ip === ip);
    if (getPort === -1) {
      console.log({ error: "PORT NOT FOUND" });
      return { error: "PORT NOT FOUND" };
    }
    return getPort + 1;
  }

  private broadcast(message: IPackage) {
    print("BROADCAST [SWITCH]");
    const getPort = this.getHostPort(message.originIp);

    if (getPort.error) return getPort.error;

    this.table?.load(getPort, message.originIp, true);
    console.log({ status: "BROADCAST", table: this.table?.data });
    this.connections.forEach((host, idx) => {
      host?.isMessageToMe && host?.isMessageToMe(message, getPort);
    });
  }
}
