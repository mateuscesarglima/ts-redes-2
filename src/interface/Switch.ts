import IArcTable from "./ArcTable";
import IHost from "./Host";

export default interface ISwitch {
  qtdPorts: number;
  connections: IHost[];
  arcTable?: IArcTable;

  send: (params: string) => any;
}
