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

  send(params: IPackage, isReply?: boolean, isDirectReply?: boolean) {
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
    const message = new Package(data); // mudar prop
    if (
      [Constants.arcRequestPayload, Constants.arcReplyPayload].indexOf(
        message.payload
      ) !== -1
    ) {
      // criar um enum de cabeçalho do tipo de mensagem

      // salvar quando não tiver o mac destino
      this.originalMessage = message.payload;
    }

    console.log({
      status: "STARTING SENDING",
      message,
    });

    const hasDestinationMac = this.arcTable?.data.find(
      (el) => el.mac === destinationMac
    );

    if (!hasDestinationMac) return this.preSend(message); // mudar para arp request

    message.destinationMac = hasDestinationMac
      ? hasDestinationMac.mac
      : Constants.withoutDestinationMac;

    console.log({
      status: "SENDING NORMAL",
    });

    const _package = message.generate(message);
    this.connection?.send(_package, isReply, isDirectReply);
  }

  sendOriginal(params: IPackage) {
    const data: IPackage = {
      originIp: this.ip,
      originMac: this.mac,
      payload: this.originalMessage.payload,
      destinationIp: params.originIp,
      destinationMac: params.originMac,
    };
    const message = new Package(data);
    print("ORIGINAL SEND");

    this.send(message, true, true);
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

  reply(params: IPackage, isArpReply?: boolean) {
    const data = {
      originIp: this.ip,
      originMac: this.mac,
      payload: Constants.arcReplyPayload,
      destinationIp: params.originIp,
      destinationMac: params.originMac,
    };

    print(
      `[${isArpReply ? "ARP" : ""}] REPLY [HOST: ${this.ip}] -> [HOST: ${
        params.originIp
      }]`
    );

    this.send(data, isArpReply);
  }

  setArcTable(port: number, mac: string): any {
    this.arcTable?.load(port, mac);
  }

  isMessageToMe(params: IPackage, port: number): boolean {
    params.originIp !== this.ip && this.setArcTable(port, params.originMac);

    if (params.destinationIp === this.ip) {
      console.log({ status: "IS_MESSAGE_TO_ME", ip: this.ip });
      this.reply(params, true);
      return true;
    }
    return false;
  }

  public get table() {
    return this.arcTable?.data;
  }
}
