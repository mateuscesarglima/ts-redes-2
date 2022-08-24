export default interface IPackage {
  originIp: string;
  destinationIp: string;
  originMac: string;
  destinationMac?: string;
  payload: any;

  generate?: (params: IPackage) => string;
}
