export interface TableData {
  port: number;
  mac?: string;
  ip?: string;
}

export default interface IArcTable {
  data: TableData[];

  load: (port: number, macOrIp: string, isSwitch?: boolean) => TableData[];
}
