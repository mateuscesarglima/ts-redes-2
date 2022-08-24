import { Constants } from "../constants";
import IArcTable from "../interface/ArcTable";
import IHost from "../interface/Host";
import IPackage from "../interface/Package";
import ISwitch from "../interface/Switch";
import { decodeMessage } from "../utils";

export default class Switch implements ISwitch {
  public arcTable!: IArcTable | undefined;
  public qtdPorts: number = 1;
  public connections: IHost[] = [];

  constructor({ qtdPorts, connections, arcTable }: ISwitch) {
    this.qtdPorts = qtdPorts;
    this.connections = connections;
    this.arcTable = arcTable;
  }

  send(params: string) {
    const decodedMessage: IPackage = decodeMessage(params);

    console.log({ arcTable: this.arcTable?.data });

    const data = this.arcTable?.data.find(
      (el) => el.mac === decodedMessage.originMac
    );
    console.log({
      status: "send message",
      component: "switch",
      decodedMessage,
    });
    if (!data) this.broadcast(decodedMessage);
    // this.arcTable?.load()
  }

  private broadcast(message: IPackage) {
    console.log("--------------------");
    console.log({ status: "broadcast", component: "switch" });
    const getPort = this.connections.findIndex(
      (el) => el.ip === message.originIp
    );

    this.connections.forEach((el, idx) => {
      if (el.ip === message.destinationIp) {
        message.destinationMac === Constants.withoutDestinationMac &&
          el?.send &&
          el?.send(el.ip, "oi", el.mac);

        // this.connections[idx] &&
        //   this.connections[idx].reply &&
        //   this.connections[idx].reply(message);
      }

      if (idx !== getPort)
        el?.setArcTable && el.setArcTable(getPort + 1, message.originMac);
    });

    this.arcTable?.load(getPort + 1, message.originMac);

    console.log({
      status: "set arc table",
      component: "switch",
      arcTable: this.arcTable?.data,
    });
  }
}
