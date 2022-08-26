import { Constants } from "../constants";
import IPackage from "../interface/Package";
import { encodeMessage } from "../utils";

export default class Package implements IPackage {
  public originIp: string = "";
  public destinationIp: string = "";
  public originMac: string = "";
  public destinationMac?: string = Constants.withoutDestinationMac;
  public payload: any;

  constructor({
    originIp,
    originMac,
    payload,
    destinationIp,
    destinationMac,
  }: IPackage) {
    this.originIp = originIp;
    this.originMac = originMac;
    destinationMac && (this.destinationMac = destinationMac);
    this.destinationIp = destinationIp;
    this.payload = payload;
  }

  generate(params: IPackage): string {
    const { originIp, originMac, destinationMac, destinationIp, payload } =
      params;
    const _destinationMac = destinationMac || Constants.withoutDestinationMac;
    let _payload =
      _destinationMac === Constants.withoutDestinationMac
        ? Constants.arcRequestPayload
        : payload;

    const message = encodeMessage({
      originIp,
      originMac,
      destinationMac: _destinationMac,
      destinationIp,
      payload: _payload,
    });

    console.log({
      step: "GENERATE MESSAGE",
      data: {
        originIp,
        originMac,
        destinationMac: _destinationMac,
        destinationIp,
        payload,
      },
    });

    return message;
  }
}
