import { Constants } from "../constants";
import IPackage from "../interface/Package";
import { encodeMessage } from "../utils";

export default class Package implements IPackage {
  public originIp: string = "";
  public destinationIp: string = "";
  public originMac: string = "";
  public destinationMac: string = Constants.withoutDestinationMac;
  public payload: any;

  constructor() {}

  generate(params: IPackage): string {
    const { originIp, originMac, destinationMac, destinationIp, payload } =
      params;
    const _destinationMac = destinationMac || Constants.withoutDestinationMac;

    const message = encodeMessage({
      originIp,
      originMac,
      destinationMac: _destinationMac,
      destinationIp,
      payload,
    });

    return message;
  }
}
