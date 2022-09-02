export interface TableData {
  port?: number;
  mac?: string;
  ip?: string;
}

export interface LoadTableProps extends TableData {
  isSwitch?: boolean;
}

export default interface ITable {
  data: TableData[];

  load: ({ mac, ip, isSwitch }: LoadTableProps) => TableData[];
}
