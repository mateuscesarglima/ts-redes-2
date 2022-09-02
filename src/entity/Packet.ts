import { Constants } from "../constants";
import IPacket, { PacketHeaderEnum } from "../interface/Packet";
import { encodeMessage } from "../utils";

export default class Packet implements IPacket {
  public originIp: string = "";
  public destinationIp: string = "";
  public originMac: string = "";
  public destinationMac?: string = Constants.withoutDestinationMac;
  public payload: any;
  public header?: PacketHeaderEnum;

  constructor({
    originIp,
    originMac,
    payload,
    destinationIp,
    destinationMac,
    header,
  }: IPacket) {
    this.originIp = originIp;
    this.originMac = originMac;
    destinationMac && (this.destinationMac = destinationMac);
    this.destinationIp = destinationIp;
    this.payload = payload;
    this.header = header;
  }

  generate(params: IPacket): string {
    const {
      originIp,
      originMac,
      destinationMac,
      destinationIp,
      payload,
      header,
    } = params;

    const _destinationMac = destinationMac || Constants.withoutDestinationMac;

    const _payload =
      _destinationMac === Constants.withoutDestinationMac
        ? Constants.arpRequestPayload
        : payload;

    const message = encodeMessage({
      originIp,
      originMac,
      destinationMac: _destinationMac,
      destinationIp,
      payload: _payload,
      header,
    });

    console.log({
      step: "GENERATE MESSAGE",
    });

    return message;
  }
}
