export default interface IPacket {
  originIp: string;
  destinationIp: string;
  originMac: string;
  destinationMac?: string;
  payload: any;

  generate?: (params: IPacket) => string;
}
