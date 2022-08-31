import ITable, { TableData } from "../interface/Table";

export default class ArpTable implements ITable {
  public data: TableData[];

  constructor() {
    this.data = [];
  }

  load(port: number, macOrIp: string, isSwitch = false): TableData[] {
    const key = isSwitch ? "ip" : "mac";

    const findData = this.data.find(
      (el) => el[isSwitch ? "mac" : "ip"] === macOrIp
    );

    if (!findData)
      this.data.push({
        port,
        [key]: macOrIp,
      });

    return this.data;
  }
}
