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

  send(params: string, isReply?: boolean) {
    const decodedMessage: IPackage = decodeMessage(params);
    const hasDestinationMacArpTable = this.table?.data.find(
      (el) => el.ip === decodedMessage.destinationIp
    );
    if (!isReply) {
      if (
        decodedMessage.destinationMac !== Constants.withoutDestinationMac ||
        !hasDestinationMacArpTable
      ) {
        console.log({ status: "BROADCAST", payload: decodedMessage.payload });
        return this.broadcast(decodedMessage);
      }
    }

    console.log({
      status: "NÃO FAZ BROADCAST",
      message: decodedMessage,
      table: this.table?.data,
    });

    const getPort = this.getHostPort(decodedMessage.originIp);
    if (getPort.error) return getPort.error;

    this.table?.load(getPort, decodedMessage.originIp, true);
    this.connections.forEach((host, idx) => {
      if (host.ip === decodedMessage.destinationIp)
        host?.sendOriginal && host?.sendOriginal(decodedMessage);
      decodedMessage.originIp !== host.ip &&
        host?.setArcTable &&
        host?.setArcTable(getPort, decodedMessage.originMac);
    });

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
