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

  send(params: string) {
    const decodedMessage: IPackage = decodeMessage(params);

    const hasDestinationMacArpTable = this.table?.data.find(
      (el) => el.mac === decodedMessage.destinationMac
    );
    if (
      decodedMessage.destinationMac !== Constants.withoutDestinationMac ||
      !hasDestinationMacArpTable
    ) {
      return this.broadcast(decodedMessage);
    }
  }

  private broadcast(message: IPackage) {
    print("BROADCAST [SWITCH]");
    this.connections.forEach((host, idx) => {
      const getPort = this.connections.findIndex(
        (el) => el.ip === message.originIp
      );
      if (getPort !== -1) {
        const isMessageToMe =
          host?.isMessageToMe && host?.isMessageToMe(message, getPort + 1);
        console.log({ status: "SENDING", isMessageToMe });
        isMessageToMe && this.table?.load(getPort + 1, host.mac);
      }
    });
  }
}
