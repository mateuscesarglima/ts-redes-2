export interface TableData {
  port: number;
  mac?: string;
  ip?: string;
}

export default interface ITable {
  data: TableData[];

  load: (port: number, macOrIp: string, isSwitch?: boolean) => TableData[];
}
