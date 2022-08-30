import IArcTable from "./ArcTable";
import IHost from "./Host";

export default interface ISwitch {
  qtdPorts: number;
  connections: IHost[];
  table?: IArcTable;

  send: (params: string, isReply?: boolean, isDirectReply?: boolean) => any;
}
