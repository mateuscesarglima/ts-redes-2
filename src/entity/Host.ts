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

  send(params: IPackage) {
    const { destinationMac, payload, destinationIp } = params;
    print(`SEND MESSAGE [HOST: ${this.ip}] to [HOST: ${destinationIp}]`);

    if (this.isReply(params.payload)) {
      print("CONNECTION FINISHED");
      return { message: "Connection finished" };
    }
    if (!this.connection) {
      console.log({ error: "connection fail" });
      return { error: "connection fail" };
    }

    const message = new Package();
    const data: IPackage = {
      originIp: this.ip,
      originMac: this.mac,
      payload: destinationMac ? payload : Constants.arcRequestPayload,
      destinationIp,
    };
    const hasDestinationMac = this.arcTable?.data.find(
      (el) => el.mac === destinationMac
    );

    data.destinationMac = hasDestinationMac
      ? hasDestinationMac.mac
      : Constants.withoutDestinationMac;

    const _package = message.generate(data);
    this.connection?.send(_package);
  }

  private isReply(payload: IPackage["payload"]) {
    return payload && payload === Constants.arcReplyPayload;
  }

  reply(params: IPackage) {
    const data = {
      originIp: this.ip,
      originMac: this.mac,
      payload: Constants.arcReplyPayload,
      destinationIp: params.originIp,
      destinationMac: params.originMac,
    };
    this.send(data);
    // console.log({ status: "REPLY [HOST]", hostIp: this.ip, data });
  }

  setArcTable(port: number, mac: string): any {
    this.arcTable?.load(port, mac);
  }

  isMessageToMe(params: IPackage, port: number): boolean {
    this.setArcTable(port, params.originMac);
    if (params.destinationIp === this.ip) {
      this.reply(params);
      return true;
    }
    return false;
  }
}
