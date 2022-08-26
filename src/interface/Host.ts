import IArcTable from "./ArcTable";
import IPackage from "./Package";
import ISwitch from "./Switch";

export default interface IHost {
  ip: string;
  mac: string;
  connection?: ISwitch;

  arcTable?: IArcTable;

  send?: (params: IPackage, isReply?: boolean) => any;
  sendOriginal?: (params: IPackage) => any;

  reply?: (params: IPackage) => any;
  setArcTable?: (port: number, mac: string) => any;
  isMessageToMe?: (params: IPackage, port: number) => boolean;
}
