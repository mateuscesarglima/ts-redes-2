import { Constants } from "../constants";
import IArcTable from "../interface/ArcTable";
import IHost from "../interface/Host";
import IPackage from "../interface/Package";
import Switch from "../interface/Switch";
import { print } from "../utils";
import Package from "./Package";

export default class Host implements IHost {
  public ip: string = "";
  public mac: string = "";
  public arcTable!: IArcTable | undefined;
  public connection!: Switch | undefined;

  constructor({ ip, mac, arcTable, connection }: IHost) {
    this.ip = ip;
    this.mac = mac;
    this.arcTable = arcTable;
    this.connection = connection;
  }

  send(destinationIp: string, payload: string, destinationMac?: string) {
    print("SEND MESSAGE [HOST]");
    console.log({
      status: `send message with${destinationMac ? "" : "out"} destinationMac`,
      component: "host",
    });
    if (!this.connection) {
      console.log({ error: "connection fail" });
      return { error: "connection fail" };
    }
    const message = new Package();
    const data = {
      originIp: this.ip,
      originMac: this.mac,
      payload: destinationMac ? payload : Constants.arcRequestPayload,
      destinationIp,
      destinationMac: destinationMac || Constants.withoutDestinationMac,
    };

    const _package = message.generate(data);
    this.connection?.send(_package);
  }

  reply(params: IPackage): string {
    const data = {
      originIp: this.ip,
      originMac: this.mac,
      payload: "REPLY",
      destinationIp: params.originIp,
      destinationMac: params.originMac,
    };
    console.log({ status: "reply", hostIp: this.ip, data });

    return "";
  }

  setArcTable(port: number, mac: string): any {
    this.arcTable?.load(port, mac);
    console.log({
      status: "set arc table",
      component: "host",
      host: this.ip,
      arcTable: this.arcTable?.data,
    });
  }
}
