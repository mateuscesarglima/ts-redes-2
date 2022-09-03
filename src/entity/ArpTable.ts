import ITable, { LoadTableProps, TableData } from "../interface/Table";

export default class ArpTable implements ITable {
  public data: TableData[];

  constructor() {
    this.data = [];
  }

  load({ mac, ip, isSwitch, port }: LoadTableProps): TableData[] {
    return isSwitch ? this.loadIfSwitch(port, mac) : this.loadArpTable(ip, mac);
  }

  private loadIfSwitch(port?: number, mac?: string) {
    if (!port && !mac) return [];
    const findData = this.data.find((el) => el.mac === mac);

    if (!findData)
      this.data.push({
        port,
        mac,
      });

    return this.data;
  }

  private loadArpTable(ip?: string, mac?: string) {
    if (!ip && !mac) return [];
    const findData = this.data.find((el) => el.ip === ip);

    if (!findData)
      this.data.push({
        ip,
        mac,
      });

    return this.data;
  }
}
