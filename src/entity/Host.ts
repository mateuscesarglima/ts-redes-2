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
  private originalMessage!: Package;

  constructor({ ip, mac, arcTable, connection }: IHost) {
    this.ip = ip;
    this.mac = mac;
    this.arcTable = arcTable;
    this.connection = connection;
  }

  send(params: IPackage, isReply?: boolean) {
    const { destinationMac, payload, destinationIp } = params;

    if (!this.connection) {
      console.log({ error: "connection fail" });
      return { error: "connection fail" };
    }

    print(`SEND MESSAGE [HOST: ${this.ip}] to [HOST: ${destinationIp}]`);

    const data: IPackage = {
      originIp: this.ip,
      originMac: this.mac,
      payload,
      destinationIp,
    };
    const message = new Package(data);
    if (
      [Constants.arcRequestPayload, Constants.arcReplyPayload].indexOf(
        message.payload
      )
    )
      this.originalMessage = message.payload;

    console.log({
      status: "STARTING SENDING",
      message,
    });
    const hasDestinationMac = this.arcTable?.data.find(
      (el) => el.mac === destinationMac
    );

    if (!hasDestinationMac) return this.preSend(message);

    message.destinationMac = hasDestinationMac
      ? hasDestinationMac.mac
      : Constants.withoutDestinationMac;

    console.log({
      status: "SENDING NORMAL",
    });

    const _package = message.generate(message);
    this.connection?.send(_package, isReply);
  }

  sendOriginal(params: IPackage) {
    console.log({
      status: "SEND ORIGINAL",
      params,
      originalMessage: this.originalMessage,
    });
    // this.send()
  }

  private preSend(params: Package) {
    this.originalMessage = params;
    const arpRequest = {
      ...params,
      payload: Constants.arcRequestPayload,
    };
    const _package = params.generate(arpRequest);
    console.log({
      status: "PRE SENDING",
    });
    this.connection?.send(_package);
  }

  reply(params: IPackage) {
    const data = {
      originIp: this.ip,
      originMac: this.mac,
      payload: Constants.arcReplyPayload,
      destinationIp: params.originIp,
      destinationMac: params.originMac,
    };

    print(`REPLY [HOST: ${this.ip}] -> [HOST: ${params.originIp}]`);

    this.send(data, true);
  }

  setArcTable(port: number, mac: string): any {
    this.arcTable?.load(port, mac);
  }

  isMessageToMe(params: IPackage, port: number): boolean {
    params.originIp !== this.ip && this.setArcTable(port, params.originMac);
    if (params.destinationIp === this.ip) {
      console.log({ status: "IS_MESSAGE_TO_ME", ip: this.ip });
      this.reply(params);
      return true;
    }
    return false;
  }
}
