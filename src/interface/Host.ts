import IArcTable from "./ArcTable";
import IPackage from "./Package";
import ISwitch from "./Switch";

export default interface IHost {
  ip: string;
  mac: string;
  connection?: ISwitch;

  arcTable?: IArcTable;

  send?: (
    destinationIp: string,
    payload: string,
    destinationMax?: string
  ) => any;

  reply?: (params: IPackage) => string;
  setArcTable?: (port: number, mac: string) => any;
}
